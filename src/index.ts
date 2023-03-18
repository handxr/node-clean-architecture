import app from "./app";
import http from "http";
import serverConfig from "./config/server";

const server = http.createServer(app);

server.listen(serverConfig.port, () => {
  console.log(`Server running on port ${serverConfig.port}`);
});
