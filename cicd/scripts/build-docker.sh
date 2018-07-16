#!/usr/bin/env bash
TAG=$1
WORKDIR=$2
NAME=$3

#dlb1 to build, dl6 to run
DOCKER_HOST='tcp://dlb1.aureacentral.com:2375'

echo "TAG=${TAG} NAME=${NAME} DOCKER_HOST=${DOCKER_HOST} WORKDIR=${WORKDIR}"
docker build -t $NAME:$TAG $WORKDIR
