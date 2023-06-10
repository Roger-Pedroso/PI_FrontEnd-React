FROM node:current-alpine3.18 AS builder
WORKDIR /user/sqhg-frontend
COPY package.json ./
COPY yarn.lock ./
RUN npm install
COPY . ./   
RUN npm run build


FROM node:current-alpine3.18
WORKDIR /usr/src/app
COPY --from=builder /user/sqhg-frontend ./
EXPOSE 3000
CMD ["npm", "start"]
