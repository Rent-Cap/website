FROM ubuntu

RUN apt-get update && \
    DEBIAN_FRONTEND=noninteractive apt-get install -yq nginx && \
    apt-get install -y curl git-core

RUN cd ~ && \
    curl -sL https://deb.nodesource.com/setup_14.x -o setup_14.sh && \
    sh ./setup_14.sh && \
    apt-get install -y nodejs
