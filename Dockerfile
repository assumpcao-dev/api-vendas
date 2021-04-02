FROM alpine:node

WORKDIR /app

COPY package.json ./

RUN npm install

COPY ./ ./

CMD ["npm", "install"]
