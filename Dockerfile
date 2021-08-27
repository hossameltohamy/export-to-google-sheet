FROM node:14
EXPOSE 3000
# Use latest version of npm
RUN npm i npm@latest -g
COPY package.json package-lock.json* ./
RUN npm install 
# copy in our source code last, as it changes the most
WORKDIR /opt
COPY . .
CMD [ "npm", "start" ]
