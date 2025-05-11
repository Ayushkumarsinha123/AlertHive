// File: worker.js
const { workerData, parentPort } = require("worker_threads");
const BatchData = require("./data-processor/BatchData");

const { apiList, mode = "random" } = workerData; // 'batch' or 'random'
const processor = new BatchData(apiList, 5); // 5 is your batch size

(async () => {
  try {
    if (mode === "random") {
      await processor.processRandomItem(parentPort);
    } else {
      await processor.processBatch(parentPort);
    }

    parentPort.postMessage("Worker done.");
  } catch (err) {
    parentPort.postMessage("Worker crashed: " + err.message);
  }
})();
