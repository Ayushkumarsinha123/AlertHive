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

function runWorker() {
    const worker = new Worker(path.resolve(__dirname, 'worker.js'), {
        workerData: {
            apiList: API_LIST,
        }
    });

    worker.on('message', (msg) => {
        console.log('[Worker Message]', msg);
    });

    worker.on('error', (err) => {
        console.error('[Worker Error]', err);
    });

    worker.on('exit', (code) => {
        if (code !== 0)
            console.warn(`Worker exited with code ${code}`);
    });

    // Schedule next run
    setTimeout(runWorker, INTERVAL * 1000);
}

// Start scheduler
runWorker();