# ticket-app-microservice

###### Tested Ubuntu 20.04.1 LTS (VM)

#### 1. [Install docker](https://docs.docker.com/engine/install/ubuntu/)
#### 1. [Install kubectl](https://kubernetes.io/docs/tasks/tools/install-kubectl/)
#### 1. [Install minikube](https://minikube.sigs.k8s.io/docs/start/)
#### 2. [Install skaffold](https://skaffold.dev/docs/install/)

## Start your cluster:
#### Run `minikube start`

## Create jwt secret
#### Run `kubectl create secret generic jwt-secret --from-literal=JWT_KEY=secret`

## Start skaffold
#### Run `skaffold dev`


## Get secret list (optional)
###### Run `kubectl get secrets`
