#!/usr/bin/env bash

cd ../k8s

kubectl --namespace=zerobaseweb-dev apply -f deployment-api.yml
kubectl --namespace=zerobaseweb-dev apply -f deployment-ui.yml

kubectl --namespace=zerobaseweb-dev apply -f service-api.yml
kubectl --namespace=zerobaseweb-dev apply -f service-ui.yml

kubectl --namespace=zerobaseweb-dev apply -f ingress.yml
