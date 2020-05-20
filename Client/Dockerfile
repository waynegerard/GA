FROM node:13.8.0-buster
RUN apt-get update
RUN apt-get install -y bash ffmpeg wget

RUN mkdir /app
WORKDIR /app

COPY package.json /app/package.json

RUN if [ "$NODE_ENV" = "development" ]; \
	then yarn install;  \
	else yarn install --only=production; \
	fi

COPY . /app