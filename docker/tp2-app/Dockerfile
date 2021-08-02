FROM tp2-base

RUN cd /var/www && \
    git clone https://github.com/techequitycollaborative/tenantprotections2 && \
    rm -rf html && \
    cd tenantprotections2 && \
    rm package-lock.json && \
    npm install && \
    npm run build && \
    mv public ../html

CMD service nginx start && tail -f /dev/null
