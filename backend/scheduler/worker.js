const { workerData, parentPort } = require('worker_threads');
const axios = require('axios');

async function fetchAndProcess(apiList) {
    const tasks = apiList.map(async (url) => {
        try {
            const res = await axios.get(url);
            const data = res.data;

            parentPort.postMessage(data)

            // Custom logic

        } catch (err) {
            parentPort.postMessage(`Failed to fetch ${url}: ${err.message}`);
        }
    });

    await Promise.allSettled(tasks);
}

fetchAndProcess(workerData.apiList)
    .then(() => {
        parentPort.postMessage('Worker done.');
    })
    .catch((err) => {
        parentPort.postMessage('Worker crashed: ' + err.message);
    });
