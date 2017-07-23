FROM mhart/alpine-node:latest

# we could build this image through less steps, but the folllowing commmands are defined 
# as is to take advantage of the image layer caching feature of docker

ADD package.json /tmp/package.json

RUN cd /tmp && npm install
RUN mkdir -p /opt/app && cp -a /tmp/node_modules /opt/app/

WORKDIR /opt/app

ADD . /opt/app

EXPOSE 3000

CMD ["npm", "start"]