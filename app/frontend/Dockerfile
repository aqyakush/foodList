# Use an official Node.js runtime as a parent image
FROM node:14

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install application dependencies
RUN npm install

# Copy the entire application source code to the container
COPY . .

# Build the React app
RUN npm run build

# Expose the port on which the React app will run (e.g., 80)
EXPOSE 3000

# Start the React app
CMD ["npm", "start"]