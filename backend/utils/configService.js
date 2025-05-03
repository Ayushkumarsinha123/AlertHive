const fs = require('fs');
const path = require('path');

const configPath = path.join(__dirname, '..', 'api.config.json');

let config = {};
loadConfig();

function loadConfig() {
    try {
        const raw = fs.readFileSync(configPath, 'utf-8');
        config = JSON.parse(raw);
    } catch (err) {
        console.error('Failed to load config:', err);
        config = {};
    }
}

// Auto reload on change
fs.watch(configPath, (eventType) => {
    if (eventType === 'change') {
        console.log('[Config] Reloading...');
        loadConfig();
    }
});

function getConfig() {
    return config;
}

module.exports = { getConfig };
