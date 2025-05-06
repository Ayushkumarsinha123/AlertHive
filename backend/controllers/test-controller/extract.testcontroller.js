const catchAsync = require("./../../utils/catchAsync")

const XHandle = require("./../../models/XDisasterSourceModel")
const XPost = require("./../../models/XDisasterPostModel")

const APIFeatures = require("./../../utils/APIFeatures")

const AppError = require("./../../utils/appError")

// MAPPING to get Model
const SOURCE_TO_MODEL_MAP = {
    "x": XPost
}

// Middleware to get SOURCE 
exports.getSource = async (req, res, next) => {
    const SOURCE = req.query.source;

    if (SOURCE === undefined) return next(new AppError("Source to extract data not provided", 400))

    req.__SOURCE = SOURCE;

    next()
}

// Test Controller
exports.getTestResult = catchAsync(async (req, res, next) => {
    res.status(200).json({
        source: req.__SOURCE,
        status: "success"
    });
});

// MOCK Controllers for X POSTS DATA
exports.getAllMockData = catchAsync(async (req, res, next) => {
    const features = new APIFeatures(XPost.find(), req.query)
        .filter()
        .sort()
        .limitFields()
        .paginate();

    const DATA = await features.query;

    res.status(200).json({
        status: "success",
        results: DATA.length,
        data: {
            DATA,
        },
    });
})

exports.createMockXHandle = catchAsync(async (req, res, next) => {
    const newHandle = await XHandle.create(req.body);

    res.status(201).json({ status: "success", data: { handle: newHandle } });
})