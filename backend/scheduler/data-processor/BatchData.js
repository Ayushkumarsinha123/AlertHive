const axios = require("axios");

class BatchData {
  constructor(apiList, batchSize = 5) {
    this.apiList = apiList;
    this.batchSize = batchSize;
  }

  async fetchData(url) {
    const res = await axios.get(url);
    return res.data?.data?.DATA || [];
  }

  async processRandomItem(parentPort) {
    const tasks = this.apiList.map(async (url) => {
      try {
        const finalData = [];

        const dataArray = await this.fetchData(url);
        const randomItem =
          dataArray[Math.floor(Math.random() * dataArray.length)];

        finalData.push(randomItem);

        parentPort.postMessage({ event: "DATA_FROM_WORKER", data: finalData });
      } catch (err) {
        parentPort.postMessage(`Failed to fetch ${url}: ${err.message}`);
      }
    });

    await Promise.allSettled(tasks);
  }

  async processBatch(parentPort) {
    const tasks = this.apiList.map(async (url) => {
      try {
        const dataArray = await this.fetchData(url);
        const shuffled = dataArray.sort(() => 0.5 - Math.random());
        const batch = shuffled.slice(0, this.batchSize);
        parentPort.postMessage({ event: "DATA_FROM_WORKER", data: batch });
      } catch (err) {
        parentPort.postMessage(`Failed to fetch ${url}: ${err.message}`);
      }
    });

    await Promise.allSettled(tasks);
  }
}

module.exports = BatchData;
