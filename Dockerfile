FROM node:12
WORKDIR /app
ADD . /app
RUN npm install --verbose
EXPOSE 3000
CMD npm start
