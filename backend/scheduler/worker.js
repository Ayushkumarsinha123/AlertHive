const { workerData, parentPort } = require('worker_threads');
const axios = require('axios');

// Extracting the passed DATA
const { apiList } = workerData;

async function fetchAndProcess(apiList) {
    const tasks = apiList.map(async (url) => {
        try {
            const res = await axios.get(url);
            const data = res.data;

            // Custom logic
            parentPort.postMessage({ event: 'DATA_FROM_WORKER', data });
        } catch (err) {
            parentPort.postMessage(`Failed to fetch ${url}: ${err.message}`);
        }
    });

    await Promise.allSettled(tasks);
}

fetchAndProcess(apiList)
    .then(() => {
        parentPort.postMessage('Worker done.');
    })
    .catch((err) => {
        parentPort.postMessage('Worker crashed: ' + err.message);
    });
