const { Worker } = require('worker_threads');
const dotenv = require("dotenv");
const path = require("path")

const { WebSocket, getClients } = require("./../ws/server")
const { broadcastToClients } = require("./../ws/utils/broadcast")

dotenv.config({ path: path.resolve(__dirname, '../config.env') });

// CHANGE this value as per DATA need
const DATA_LIMIT = 1;

// SOURCE
const SOURCE_X = 'x';

// MOCK APIs FROM WHERE DATA NEEDS TO BE EXTRACTED
const ROOT = 'http://localhost:6010';

const API_PATHS = [
    `/api/test/xposts-mock?source=${SOURCE_X}&limit=${DATA_LIMIT}`,
];

// const API_PATHS = ['/api/test?source=x']

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

        if (msg.event === 'DATA_FROM_WORKER') {
            // Get list of connected clients
            const clients = getClients()

            const PAYLOAD = {
                event: 'X_NEWS',
                data: msg.data
            }

            console.log(PAYLOAD)

            broadcastToClients(clients, WebSocket, PAYLOAD);
        }
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

module.exports = runWorker;