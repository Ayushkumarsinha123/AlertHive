const { Worker } = require("worker_threads");
const dotenv = require("dotenv");
const path = require("path");

const { WebSocket, getClients } = require("./../ws/server");
const { broadcastToClients } = require("./../ws/utils/broadcast");

dotenv.config({ path: path.resolve(__dirname, "../config.env") });

// CHANGE this value as per DATA need
const DATA_LIMIT = 1;

// SOURCE
const SOURCE_X = "x";

// MOCK APIs FROM WHERE DATA NEEDS TO BE EXTRACTED
const ROOT = "http://localhost:6010";
const ROOT_2 = "http://127.0.0.1:8000";

const API_PATHS = [`/api/test/xposts-mock?source=${SOURCE_X}`];
const API_PATHS_2 = [`/twikit-x-cached`];

// Merge ROOT with API_PATHS
const apiList1 = API_PATHS.map((path) => `${ROOT}${path}`);

// Merge ROOT_2 with API_PATHS_2
const apiList2 = API_PATHS_2.map((path) => `${ROOT_2}${path}`);

// Combine both into a single list
const API_LIST = [...apiList1, ...apiList2];

// INTERVAL DURATION
const INTERVAL = process.env.SCHEDULER_DURATION;

function runWorker() {
  const worker = new Worker(path.resolve(__dirname, "worker.js"), {
    workerData: {
      apiList: API_LIST,
    },
  });

  worker.on("message", (msg) => {
    console.log("[Worker Message]", msg);

    if (msg.event === "DATA_FROM_WORKER") {
      // Get list of connected clients
      const clients = getClients();

      const PAYLOAD = {
        event: "X_NEWS",
        data: msg.data,
      };

      console.log(PAYLOAD);

      broadcastToClients(clients, WebSocket, PAYLOAD);
    }
  });

  worker.on("error", (err) => {
    console.error("[Worker Error]", err);
  });

  worker.on("exit", (code) => {
    if (code !== 0) console.warn(`Worker exited with code ${code}`);
  });

  // Schedule next run
  setTimeout(runWorker, INTERVAL * 1000);
}

module.exports = runWorker;
