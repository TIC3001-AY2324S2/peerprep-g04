Docker:

## First build

`docker build -t peerprep-client .`

`docker run --name peerprep-client-app -p 3000:3000 -v $(pwd):/app peerprep-client`

docker run: This command is used to create a new container and start it. It's essentially a combination of docker create (which creates a new container from an image) and docker start (which starts a stopped container). When you use docker run, Docker will create a new container from the specified image and immediately start it.

`docker start peerprep-client-app`

docker start: This command is used to start an existing but stopped container. If you've previously created a container (either with docker create or docker run) and it's currently stopped, you can start it again with docker start.

`docker start -a peerprep-client-app` -> so that you can see it in your logs, terminal

`docker stop peerprep-client-app`

`docker rm peerprep-client-app`
