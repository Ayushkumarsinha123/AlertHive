const express = require("express");

const extractTestController = require("./../controllers/test-controller/extract.testcontroller")

const router = express.Router();

router
    .route("/")
    .get(extractTestController.getTestResult)

module.exports = router;
