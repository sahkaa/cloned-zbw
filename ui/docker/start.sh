#!/usr/bin/env bash

#runtime environment configuration
sed  s@BACKEND_URL@${BACKEND_URL}@g /etc/app/docker/environment.json > /usr/share/nginx/html/assets/environment.json

/etc/app/package/entrypoint.sh
