#!/usr/bin/env bash
TAG=$1
NAME=$2

DOCKER_HOST='tcp://dlb1.aureacentral.com:2375'
echo "TAG=${TAG} NAME=${NAME} DOCKER_HOST=${DOCKER_HOST}"
docker tag $NAME:$TAG registry2.swarm.devfactory.com/cloned-zbw/$NAME:$TAG
docker push registry2.swarm.devfactory.com/cloned-zbw/$NAME:$TAG
