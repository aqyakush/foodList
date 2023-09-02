# Use an official Node.js runtime as a base image
FROM node:14 as builder

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install Node.js dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Build the React app for production
RUN npm run build

# Use a lightweight, official Nginx image as the production server
FROM nginx:alpine

# Copy the built React app from the builder stage to the Nginx server
COPY --from=builder /app/build /usr/share/nginx/html

# Expose port 80 for incoming HTTP requests
EXPOSE 80

# Start the Nginx server when the container starts
CMD ["nginx", "-g", "daemon off;"]
