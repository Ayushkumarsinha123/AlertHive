const { setupWebSocketServer } = require("./server");
const { createServer } = require("http");
const express = require("express");
const runWorker = require('../scheduler/customFetchAPI');

const app = express();
const server = createServer(app);

setupWebSocketServer(server);

server.listen(9000, () => {
  console.log("Listening on http://localhost:9000");

  // Running the WORKER here ( if scheduler runs in different node process)
  // then memory will be different, and fetching data will be an issue
  runWorker()
});
