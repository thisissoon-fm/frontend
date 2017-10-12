#
# SOON FM Frontend Docker image
#

# Pull alpine base image
FROM alpine:3.6

# Install Nginx
RUN apk add --update nginx && \
    rm -rf /var/cache/apk/*

RUN mkdir -p /run/nginx

# Bundle app build
COPY ./dist /fm

WORKDIR /fm

# Add nginx config - overwrite bundled nginx.conf
COPY nginx.conf /etc/nginx/

# Volumes
VOLUME ["/etc/nginx"]

# Expose ports
EXPOSE 80

CMD nginx
