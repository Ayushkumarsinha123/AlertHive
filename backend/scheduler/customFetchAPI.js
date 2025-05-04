const { Worker } = require('worker_threads');
const dotenv = require("dotenv");
const path = require("path")
const axios = require("axios")

dotenv.config({ path: path.resolve(__dirname, '../config.env') });

// MOCK APIs FROM WHERE DATA NEEDS TO BE EXTRACTED
const ROOT = 'http://localhost:6010';

const API_PATHS = [
    '/api/test',
    '/api/test/yoho',
];

// Full URLs using ROOT
const API_LIST = API_PATHS.map(path => `${ROOT}${path}`);

// INTERVAL DURATION 
const INTERVAL = process.env.SCHEDULER_DURATION

setInterval(async () => {
    await fetchAllAPI(API_LIST);

    // Your logic here
    console.log(`Calling API every ${INTERVAL} seconds`);

}, INTERVAL * 1000);

async function fetchAllAPI(API_LIST) {
    const tasks = API_LIST.map(async (url) => {
        try {
            const response = await axios.get(url);
            const data = response.data;

            // Process each response individually and immediately
            processResponse(data, url);

            return { success: true, url };
        } catch (err) {
            console.error(`Error in ${url}: ${err.message}`);
            return { success: false, url };
        }
    });

    const results = await Promise.allSettled(tasks);
}

function processResponse(data, url) {
    // Your per-API processing logic
    if (data.status === 'important') {
        console.log(`Relevant data from ${url}:`, data);
        // Emit to frontend, store, etc.
    }
}
