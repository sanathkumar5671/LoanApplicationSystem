# Use an official Node.js runtime as the base image
FROM node:14

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the Express app source code to the container
COPY . .

# Expose the port the Express app will run on
EXPOSE 5000

# Start the Express app
CMD ["npm", "run", "dev"]
