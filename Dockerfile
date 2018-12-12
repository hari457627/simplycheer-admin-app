FROM node:6.11.0
RUN mkdir /simplycheer-admin-app
WORKDIR /simplycheer-admin-app
ADD . /simplycheer-admin-app
RUN npm install -g bower && npm install && bower install --allow-root







