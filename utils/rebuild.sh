#!/bin/bash

# Navigate to project directory
cd  ~/foodList

# Pull the latest main
git checkout main
git pull origin main

# Check if there are running containers
if [ "$(docker ps -q)" != "" ]; then
    # Stop all running containers
    sudo docker rm -f $(docker ps -a -q)
fi

# Check if there are any Docker images
if [ "$(docker images -q)" != "" ]; then
    # Remove all Docker images
    sudo docker rmi $(docker images -q)
fi

docker image prune -f

cd  ~/foodList/app

# Run docker-compose up
docker-compose up -d