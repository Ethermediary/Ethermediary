sudo docker run -tid \
    -p 8001:8001 \
    --name ethermediary \
    --restart unless-stopped \
    ethermediary

sudo docker logs ethermediary
