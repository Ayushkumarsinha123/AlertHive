const express = require("express");

const userTopDisasterController = require("../controllers/userTopDisasterController");

const routeToggle = require('../middlewares/routeToggleMiddleware');

const router = express.Router();

const guard = routeToggle('userTopDisasterController')

router
    .route("/")
    .get(guard, userTopDisasterController.getTopDisasterTweets)

module.exports = router;
