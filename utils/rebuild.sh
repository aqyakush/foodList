#!/bin/bash

# Navigate to your project directory
cd  ~/foodList

# Pull the latest master
git checkout master
git pull origin master

# Stop all running containers
sudo docker stop $(docker ps -q)

# Remove all Docker images
sudo docker rmi $(docker images -q)

cd  ~/foodList/app

# Run docker-compose up
docker-compose up -d