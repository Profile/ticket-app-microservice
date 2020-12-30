# ticket-app-microservice

## If you're using minikube:
### 1. Add `imagePullPolicy: Never`
### 2. Run `eval $(minikube docker-env)`

## Create jwt secret
### Run `kubectl create secret generic jwt-secret --from-literal=JWT_KEY=secret`

## Get secret list
### Run `kubectl get secrets`
