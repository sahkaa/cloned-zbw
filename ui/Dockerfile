FROM node:latest

ENV NODE_OPTIONS --max_old_space_size=8192

# Create a directory where our app will be placed
RUN mkdir -p /usr/src/app

# Change directory so that our commands run inside this new directory
WORKDIR /usr/src/app

# Copy npm package files
COPY package* .npmrc /usr/src/app/

# Install npm dependencies
RUN npm install

# Copy app files to out container
COPY . /usr/src/app

# Build app with prod to have prod compilation enhancments.
RUN node_modules/.bin/ng build --env=prod

FROM nginx:latest

# These env are used by easier team docker/nginx generic configuration.
ENV BACKEND_URL=http://mockbin.com/request \
  BACKEND_URL2=http://mockbin.com/request \
  BACKEND_URL3=http://mockbin.com/request \
  PROXY_API2=/api2 \
  PROXY_API3=/api3

RUN mkdir -p /etc/app/assets

# donwload nginx configuration files see https://github.com/trilogy-group/dfproto-ey-docker
# this is done to avoid copying this files on all projects
ADD "http://nexus-rapid-proto.devfactory.com/repository/npm-proto/@devfactory/dfproto-ey-docker/-/dfproto-ey-docker-1.0.0.tgz" /etc/app
ADD docker /etc/app/docker

# TODO - review for the future
RUN tar -xzvf /etc/app/dfproto-ey-docker-1.0.0.tgz -C /etc/app \
  # Copy build files from first image to nginx dir
  && rm -rf /usr/share/nginx/html/* \
  # Copying nginx config
  && rm -f /etc/nginx/nginx.conf \
  && cp /etc/app/package/mime.types /etc/nginx/mime.types \
  && chmod +x /etc/app/package/entrypoint.sh \
  && mv /etc/app/docker/start.sh /etc/app/start.sh \
  && chmod +x /etc/app/start.sh

COPY --from=0 /usr/src/app/dist/ /usr/share/nginx/html/
# Expose port 80
EXPOSE 80

# Copy custom nginx.conf file and run entrypoint.sh to start nginx server
WORKDIR /etc/app

CMD ["/etc/app/start.sh"]
