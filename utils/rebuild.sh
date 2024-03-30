#!/bin/bash

# Navigate to project directory
cd  ~/foodList

# Pull the latest main
git checkout main
git pull origin main

# Check if there are running containers
if [ "$(docker ps -q)" != "" ]; then
    # Stop all running containers
    sudo docker stop $(docker ps -q)
fi

# Remove all stopped containers
sudo docker rm $(docker ps -a -q)

# Check if there are any Docker images
if [ "$(docker images -q)" != "" ]; then
    # Remove all Docker images
    sudo docker rmi $(docker images -q)
fi

cd  ~/foodList/app

# Run docker-compose up
docker-compose up -d