FROM node:erbium

COPY . .

RUN npm ci

#default port
EXPOSE 8080 

CMD ["node", "index.js"]