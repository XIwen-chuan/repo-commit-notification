docker build -t learn-front .
docker run \
-d --name learn-front \
-p 80:80 \
--memory="2g" \
--memory-swap="4g" \
--network=host \
learn-front