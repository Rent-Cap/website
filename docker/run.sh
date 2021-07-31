#!/bin/bash

docker stop tp2
docker rm tp2
docker image rm tp2
docker build --no-cache -t tp2 .
docker run -p 5001:80 --name tp2 -itd tp2
