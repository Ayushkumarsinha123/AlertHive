const { workerData, parentPort } = require('worker_threads');
const axios = require('axios');
const XPost = require('../models/XDisasterPostModel');

// Extracting the passed DATA
const { apiList } = workerData;

async function fetchAndProcess(apiList) {
    const tasks = apiList.map(async (url) => {
        try {
            // FETCHING API
            const res = await axios.get(url);

            // FETCHING LOCAL API
            // const res = await XPost.find();
            const allData = res.data;

            // Get the DATA array
            const dataArray = allData.data.DATA;

            // Select a random item
            const randomItem = dataArray[Math.floor(Math.random() * dataArray.length)];

            // Store the random item in `data`
            const data = randomItem;

            // Optional: Post message or use data as needed
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
