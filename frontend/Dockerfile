FROM node:18.16.0-alpine3.18

WORKDIR /app

# Copy and install Node dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the code
COPY . .

EXPOSE 3000

CMD ["node", "server.js"]
