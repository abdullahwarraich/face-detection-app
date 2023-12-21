# syntax=docker/dockerfile:1

# Comments are provided throughout this file to help you get started.
# If you need more help, visit the Dockerfile reference guide at
# https://docs.docker.com/engine/reference/builder/

FROM node:21.1.0

# install nestjs cli for the project globally
RUN npm install -g @nestjs/cli

# Set working directory for all build stages.
WORKDIR /usr/src/app

# Create folder for assets to store and give permission to folder
RUN mkdir /usr/src/app/assets && chmod -R 777 /usr/src/app/assets

# Copy package.json so that package manager commands can be used.
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the source files into the image.
COPY . .

# Expose the port that the application listens on.
EXPOSE 3000

# Run the application.
CMD ["npm", "run", "start:dev"]
