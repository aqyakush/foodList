# foodList
Application to keep track of your favourite recepies

Start the minikube

$ minikube start

Enable ingress in minikube

$ minikube addons enable ingress

Deploy backend

$ ./utils/build_and_install_backend.sh

Deploy frontend and ingress

$ ./utils/build_and_install_frontend.sh

Get IP address for access the application

$ kubectl get ingress

--------------------------

Development

# Build frontend image for development

$ sudo docker build -t frontend:dev -f DockerfileDev .

# Run frontend image for development

$ docker run -it -p 3000:3000 -v ~/Projects/foodList/app/frontend:/app frontend:dev