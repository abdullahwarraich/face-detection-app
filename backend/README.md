# Project Overview

This project utilizes the [Nest](https://github.com/nestjs/nest) framework, leveraging the power of TypeScript for development.

Clarifai [API](https://docs.clarifai.com/) is used for face detection in an image.

## Prerequisites for Setup
 - Install NodeJs version > `21`
 - Install NestJs CLI globally using `npm i -g @nestjs/cli`

## Project Setup
Follow these steps to set up the project:
 - Install the required packages using:
    ```bash
    $ npm install
    ```

## Running the Application
Use these commands to run the application:
```bash
# Start in development mode
$ npm run start

# Start in watch mode
$ npm run start:dev
```

### The application will run on that port
```http://localhost:3000```


## Project Structure
The project is structured as follows:
 - **_src folder_**:  Houses various subfolders related to the application:
    - **Middlewares**: Perform authentication checks to validate user tokens.
    - **Modules**: Holds feature-specific or business logic:
        - **Auth Module**: Generates user access tokens.
        - **Face Detection Module**: Facial recognition service leveraging Clarifai API, detecting faces in images and providing a count.
    - **Services**: Manage JWT validation checks.
    - **Utils**: Contains common functions used across the application.

### Author
 - **_Abdullah Warraich_**