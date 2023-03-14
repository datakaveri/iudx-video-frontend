#!/bin/bash

# Should run this from project root

docker build -t datakaveri/video-server-ui -f setup/container/Dockerfile .

docker push datakaveri/video-server-ui