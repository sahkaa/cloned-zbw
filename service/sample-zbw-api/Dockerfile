FROM sgrio/java-oracle:server_jre_8_unlimited

MAINTAINER alexander.yushchenko@aurea.com

RUN mkdir -p /opt

#Add yourkit agent
ADD docker/yourkit-linux-x86-64/libyjpagent.so /opt

# Launcher script.
ADD docker/start.sh /opt/start.sh
RUN chmod +x /opt/start.sh

# Logging.
ENV GRAYLOG_SWITCH_ON on
ENV APP_ENVIRONMENT dev
ENV FACILITY zero

# Default port to be exposed.
EXPOSE 8080

# Import application.
ADD build/libs/sample-zbw-api.jar /opt/sample-zbw-api.jar

LABEL com.trilogy.company=aurea
LABEL com.trilogy.maintainer=alexander.yushchenko@aurea.com
LABEL com.trilogy.maintainer=alexander.yushchenko
LABEL com.trilogy.product=aurea-zero-based
LABEL com.trilogy.service=sample-zbw-api
LABEL com.trilogy.stage=dev
LABEL com.trilogy.team=Easier.BackendRewrite

# Run in foreground.
CMD [ "/opt/start.sh" ]
