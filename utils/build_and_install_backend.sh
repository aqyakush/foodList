#!/bin/bash

# Delete the Kubernetes deployment and service for the backend
helm delete backend &

# Get the PID of the background command
pid=$!
# Wait for the background command to finish
wait $pid
# Continue with the next command
echo "The delete backed has finished."

# Delete the Docker image for the backend from Minikube
minikube image rm backend:v0.3

# Build the Docker image for the backend
sudo docker build -t backend:v0.3 ~/test/foodList/app/backend/.

# Load the Docker image into Minikube 
minikube image load backend:v0.3 &

# Get the PID of the background command
pid=$!
# Wait for the background command to finish
wait $pid
# Continue with the next command
echo "The image load to minikube has finished."


# Create a Kubernetes deployment and service for the backend
helm install backend ~/test/foodList/charts/backend

# Get the URL of the backend
minikube service list