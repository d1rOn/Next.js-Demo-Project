# Dockerfile

# Use node alpine as it's a small node image
FROM node:16-alpine

# Create the directory on the node image
# where our Next.js front will live
RUN mkdir -p /src/

# Set /src as the working directory
WORKDIR /src

# Copy package.json and package-lock.json
# to the /src working directory
COPY package*.json /src/

# Install dependencies in /src
RUN npm ci --legacy-peer-deps

# Copy the rest of our Next.js folder into /src
COPY . /src/

# Ensure port 3000 is accessible to our system
EXPOSE 3000

# Run yarn dev, as we would via the command line

EXPOSE 3000
ENV NEXT_TELEMETRY_DISABLED 1
CMD npm run build && npm run start
