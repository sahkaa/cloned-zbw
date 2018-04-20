#!/usr/bin/env bash
BRANCH=$1
SHA1=$2
NAME=$3

VERSION=$BRANCH-$SHA1
PROJECT=aurea-zero-based


docker tag $NAME:$VERSION registry2.swarm.devfactory.com/$PROJECT/$NAME:$VERSION
docker push registry2.swarm.devfactory.com/$PROJECT/$NAME:$VERSION
