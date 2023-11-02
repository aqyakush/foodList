#!/bin/bash

# Delete the Kubernetes deployment and service for the frontend
helm delete frontend &

# Get the PID of the background command
pid=$!
# Wait for the background command to finish
wait $pid
# Continue with the next command
echo "The delete frontend has finished."

# Wait for the frontend to be deleted
sleep 1

# Delete the Docker image for the frontend from Minikube
minikube image rm frontend:v0.12

# Build the Docker image for the frontend
sudo docker build -t frontend:v0.12 ~/Projects/foodList/app/frontend/.

# Load the Docker image into Minikube 
minikube image load frontend:v0.12 &

# Get the PID of the background command
pid=$!
# Wait for the background command to finish
wait $pid
# Continue with the next command
echo "The load frontend to minikube has finished."

# Create a Kubernetes deployment and service for the frontend
helm install frontend ~/Projects/foodList/charts/frontend

# Get the URL of the frontend
minikube service list

