const fs = require("fs");

const morgan = require("morgan");
const express = require("express");

const userTopDisasterRouter = require("./routes/userTopDisasterRoutes")
const extractTestRouter = require("./routes/extract.testroute")

const AppError = require("./utils/appError");
const globalErrorHandler = require("./controllers/errorController");

const mockPostRoutes = require('./routes/extract.testroute.js');

const app = express();

// Middlewares
if (process.env.NODE_ENV === "development") app.use(morgan("dev"));
app.use(express.json());

// TEST ROUTES
app.use("/api/test", extractTestRouter)

// PROTECTED FOR DEV ( DON'T TOUCH THESE )
app.use("/api/v1/x-user-top-disaster", userTopDisasterRouter)

// DEFINE your ROUTES here
  app.use("/api/v1/mockpost", mockPostRoutes); /// add post data to database
  
// app.all() for all the HTTP methods
app.all("*", (req, res, next) => {
  // If next() recieves an argument, express will automatically know that there
  // was an error!
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});

// Global Error Handling Middleware
app.use(globalErrorHandler);

module.exports = app;
