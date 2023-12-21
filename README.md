# Face Detection App overview

The Face Detection App is designed to upload an image and detect faces in it. It includes features such as signing in, signing up, and face detection in an image. This project comprises two services: one for the backend and another for the frontend.

## Backend Service

The backend service is developed using [NEST.JS](https://github.com/nestjs/nest). [Here](./backend/README.md) is an overview of the service.

## Frontend Service

The frontend is built using [VUE.JS](https://vuejs.org/). [Here](./frontend/README.md) is an overview of the service.

## Installation

Before running the application, ensure you have Docker installed. Follow these steps to set up the project:

1. If Docker is not installed, follow these [instructions](https://docs.docker.com/get-docker/) to install it.
2. Clone the repository: `git clone [https://github.com/abdullahwarraich/face-detection-app]`
3. Navigate to the project directory: `cd [face-detection-app]`

## Running Both Services 
To run both services, use the following command:
```bash
$ docker-compose up --build
```

### Service Ports

The services will run on the following ports:

- Backend service: ```http://localhost:3000```
- Frontend service: ```http://localhost:8080```

### Author
 - **_Abdullah Warraich_**