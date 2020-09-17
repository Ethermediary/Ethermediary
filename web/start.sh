sudo docker run -tid \
    -p 8001:8001 \
    --name ethermediary \
    --restart on-failure \
    ethermediary

sudo docker logs ethermediary