#!/bin/bash -aux

# Import new root SSL certificates.
update-ca-certificates

#
# Startup script that:
#   - Sets JVM heap to 80% of total system memory
#   - Enables basic GC logging (to aid debugging)
#   - Overrides RNG for performance
#
# Requires relatively recent bash due to use of (( )) which is not posix sh compliant.
#
# Still allows to specify (and effectively override defaults) settings via JAVA_OPTS flag, if required
# and still allows to override whole MANDATORY_JAVA_OPTS part (if really required).
#

# Get available memory size
SYSTEM_MEMORY=$(free -m | grep -oP '\d+' | head -n 1)

# Only proceed with setting memory settings if we have a valid 1G+ system memory
# (otherwise it is probably some test or validation env)
if (( SYSTEM_MEMORY > 1024 )); then
    echo "Host reports ${SYSTEM_MEMORY} MB of system memory, calculating and setting JVM memory options"

    # Give something little (20%) to OS processes
    JAVA_MEMORY=$((SYSTEM_MEMORY * 8 / 10))

    # Set mandatory options, which are not overridden by JAVA_OPTS setting
    MANDATORY_JAVA_OPTS=${MANDATORY_JAVA_OPTS:-"-agentpath:/opt/libyjpagent.so=disablestacktelemetry,disableexceptiontelemetry,delay=10000 -Xmx${JAVA_MEMORY}m -XX:+PrintGC -Djava.security.egd=file:/dev/./urandom"}
else
    echo "Host reported ${SYSTEM_MEMORY} MB of memory which is less than 1024. Skipping setting any JVM options"
fi

# If optional options are not set, use empty string
JAVA_OPTS=${JAVA_OPTS:-""}

# Try to always preserve at least GC logging
MANDATORY_JAVA_OPTS=${MANDATORY_JAVA_OPTS:-"-XX:+PrintGC"}

echo "Final java options are \"${MANDATORY_JAVA_OPTS} ${JAVA_OPTS}\""

# Don't insert line breaks, otherwise exec fails
exec java ${MANDATORY_JAVA_OPTS} ${JAVA_OPTS} -Dorg.eclipse.jetty.server.Request.maxFormContentSize=5000000 -jar /opt/sample-zbw-api.jar
