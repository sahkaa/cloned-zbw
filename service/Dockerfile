FROM openjdk:8-jdk-alpine

MAINTAINER alexander.yushchenko@aurea.com

RUN mkdir -p /opt

#Add yourkit agent
ADD service/docker/yourkit-linux-x86-64/libyjpagent.so /opt

# Launcher script.
ADD service/docker/start.sh /opt/start.sh
RUN chmod +x /opt/start.sh

# Logging.
ENV GRAYLOG_SWITCH_ON=on \
  APP_ENVIRONMENT=dev \
  FACILITY=zero

# Default port to be exposed.
EXPOSE 8080

# Build application.
WORKDIR /usr/src/cloned-zbw
COPY service/ /usr/src/cloned-zbw/service
COPY ./gradlew /usr/src/cloned-zbw
COPY /gradle /usr/src/cloned-zbw/gradle
COPY *gradle* /usr/src/cloned-zbw/
RUN /usr/src/cloned-zbw/gradlew build

# Run in foreground.
CMD [ "/opt/start.sh" ]
