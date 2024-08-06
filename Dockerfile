# Use the official Node.js image as a base image
FROM node:18

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install application dependencies
RUN npm install

# Copy the rest of the application files to the working directory
COPY . .

# Copy the environment configuration file
COPY config.env .env

# Expose the port the application will run on
EXPOSE 4000

# Command to run the application
CMD [ "npm", "start" ]
