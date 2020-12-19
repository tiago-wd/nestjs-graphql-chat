FROM node:15-alpine

RUN apk --no-cache add --virtual builds-deps build-base python

WORKDIR /var/www
ARG ENVIRONMENT
ENV ENVIRONMENT ${ENVIRONMENT}

ADD run.sh /run.sh
RUN chmod -v +x /run.sh
RUN apk update and apk add
RUN apk add imagemagick
RUN apk add ffmpeg

RUN chown -R node:node .
USER node

CMD ["/run.sh"]

EXPOSE 3000