#!/bin/bash

INGRESS_NAME=foodlist-ingress
while true; do
  ADDRESS=$(kubectl get ingress $INGRESS_NAME -o jsonpath='{.status.loadBalancer.ingress[0].ip}')
  if [ -z "$ADDRESS" ]; then
    echo "Waiting for Ingress to get an address..."
    kubectl describe ingress foodlist-ingress
    kubectl get all
    sleep 10
  else
    echo "Ingress has address: $ADDRESS"
    break
  fi
done