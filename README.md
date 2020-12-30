# ticket-app-microservice

### if you're using minikube:
## 1. Add `imagePullPolicy: Never`
## 2.run `eval $(minikube docker-env)`

### Create jwt secret
`kubectl create secret generic jwt-secret --from-literal=JWT_KEY=secret`
