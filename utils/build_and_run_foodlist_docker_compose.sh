#!/bin/bash

docker rmi -f $(docker images -q)

sudo docker build -t frontend ~/test/foodList/app/frontend/.

sudo docker build -t backend ~/test/foodList/app/backend/.

cd  ~/test/foodList/app

docker compose up