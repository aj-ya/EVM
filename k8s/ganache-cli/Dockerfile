# node:alpine will be our base image to create this image
FROM node:16-alpine3.14
# Set the /app directory as working directory
WORKDIR /app
# Install ganache-cli globally
RUN npm install -g ganache-cli
# Set the default command for the image
EXPOSE 8545

CMD ["ganache-cli","--networkId", "5777", "-h", "0.0.0.0", "--port", "8545","--db","~/db","-m","concert ladder decline crumble mention because pepper address scan volco pulse pig"]
