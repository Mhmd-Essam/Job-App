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

# Build the React application for production
RUN npm run build

# Install a simple server to serve the build files
RUN npm install -g serve

# Expose the port the application will run on
EXPOSE 5173

# Command to run the application
CMD ["serve", "-s", "build", "-l", "5173"]
