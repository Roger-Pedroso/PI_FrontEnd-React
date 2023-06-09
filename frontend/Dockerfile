FROM node:hydrogen
WORKDIR /user/sqhg-frontend
COPY package.json ./
COPY yarn.lock ./
RUN npm install
COPY . .
EXPOSE 3000
CMD ["npm","start"]
