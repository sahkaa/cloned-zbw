FROM openjdk:8

MAINTAINER ignacio.larranaga@aurea.com

RUN apt-get update && apt-get install -y curl && curl -sL https://deb.nodesource.com/setup_8.x | bash - && \
  apt-get update -qqy && apt-get -qqyy install nodejs

# Default port to be exposed.
EXPOSE 4000
EXPOSE 8080

CMD tail -f /dev/null
