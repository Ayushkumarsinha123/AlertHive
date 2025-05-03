// middleware/routeToggle.js
const { getConfig } = require('../utils/configService');

function routeToggle(controllerName) {
    return function (req, res, next) {
        const config = getConfig();
        const controllerConfig = config[controllerName];

        if (!controllerConfig || controllerConfig.enabled === false) {
            return res.status(403).json({ message: 'This controller is restricted.' });
        }

        const routeStatus = controllerConfig.routes?.[req.route.path];
        if (routeStatus === false) {
            return res.status(403).json({ message: 'This API route is restricted.' });
        }

        next();
    };
}

module.exports = routeToggle;
