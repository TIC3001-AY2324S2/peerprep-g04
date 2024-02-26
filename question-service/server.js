import http from "http";
import index from "./index.js";
import "dotenv/config.js";

const port = process.env.PORT || 3002;

const server = http.createServer(index);

console.log("Question Service - Starting on Port: ", port);

server.listen(port);
