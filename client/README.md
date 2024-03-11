Docker:

## First build

`docker build -t peerprep-client .`

`docker run --name peerprep-client-app -p 3000:3000 -v $(pwd):/app peerprep-client`

`docker stop peerprep-client-app`

`docker start peerprep-client-app`
`docker start -a peerprep-client-app` -> so that you can see it in your logs, terminal

`docker rm peerprep-client-app`
