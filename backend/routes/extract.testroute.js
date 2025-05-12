const express = require("express");

const extractTestController = require("./../controllers/test-controller/extract.testcontroller")

const router = express.Router();

const postController = require("../controllers/test-controller/extract.testcontroller");

router
    .route("/")
    .get(extractTestController.getSource, extractTestController.getTestResult)
    .post(postController.getSource, postController.createPost) 

router
    .route("/xposts-mock")
    .get(extractTestController.getSource, extractTestController.getAllMockData)

router
    .route("/xposts-mock/:postId")
    .patch(extractTestController.updateMockData)

router
    .route("/xhandles-mock")
    .post(extractTestController.createMockXHandle)

module.exports = router;
