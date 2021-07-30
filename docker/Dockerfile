FROM ubuntu

RUN apt-get update && \
    DEBIAN_FRONTEND=noninteractive apt-get install -yq nginx && \
    apt-get install -y curl git-core

RUN cd ~ && \
    curl -sL https://deb.nodesource.com/setup_14.x -o setup_14.sh && \
    sh ./setup_14.sh && \
    apt-get install -y nodejs

RUN cd /var/www && \
    git clone https://github.com/techequitycollaborative/tenantprotections2 && \
    rm -rf html && \
    cd tenantprotections2 && \
    rm package-lock.json && \
    npm install && \
    npm run build && \
    mv public ../html

CMD service nginx start && tail -f /dev/null
