FROM node
EXPOSE 3000
# Use latest version of npm
RUN npm i npm@latest -g
COPY package.json  ./
RUN ls -ahl
RUN npm install 
# copy in our source code last, as it changes the most
WORKDIR /opt
COPY . .
CMD [ "npm", "start" ]
