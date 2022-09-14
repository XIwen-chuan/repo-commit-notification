docker build -t repo-commit-notification .
docker run \
-d --name repo-commit-notification \
-p 3000:3000 \
--memory="2g" \
--memory-swap="4g" \
--network=host \
repo-commit-notification