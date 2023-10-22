# foodList
Application to keep track of your favourite recepies

Create images

$ docker build -t backend:v0.1 .
$ docker build -t frontend:v0.1 .

Upload images to minikube

$ minikube image load backend:v0.1
$ minikube image load frontend:v0.1

Install helm

$ helm install backend backend
$ helm install frontend frontend

Check the check the front end

$ minikube service list