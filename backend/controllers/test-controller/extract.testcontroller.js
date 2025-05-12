const catchAsync = require("./../../utils/catchAsync");
const AppError = require("./../../utils/appError");

const XHandle = require("./../../models/XDisasterSourceModel");
const XPost = require("./../../models/XDisasterPostModel");
const NewsDisaster = require("./../../models/newsDisasterModel");

const APIFeatures = require("./../../utils/APIFeatures");
const geocodeLocation = require("./../../utils/geocodeLocation");

// MAPPING to get Model
const SOURCE_TO_MODEL_MAP = {
  x: XPost,
  news: NewsDisaster,
};

// Middleware to get SOURCE
exports.getSource = async (req, res, next) => {
  const SOURCE = req.query.source;

  if (SOURCE === undefined)
    return next(new AppError("Source to extract data not provided", 400));

  req.__SOURCE = SOURCE;

  delete req.query.source;

  next();
};

// Test Controller
exports.getTestResult = catchAsync(async (req, res, next) => {
  const { source } = req.body;
  
  const features = new APIFeatures(
    SOURCE_TO_MODEL_MAP[source].find(),
    req.query
  )
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
});

exports.updateMockData = catchAsync(async (req, res, next) => {
  const DATA = await XPost.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!DATA) {
    return next(new AppError("No post found with that id", 404));
  }

  res.status(200).json({
    status: "success",
    data: {
      DATA,
    },
  });
});

exports.createMockXHandle = catchAsync(async (req, res, next) => {
  const newHandle = await XHandle.create(req.body);

  res.status(201).json({ status: "success", data: { handle: newHandle } });
});

// ✅ New Controller: Create a Post for Source (x or news)
exports.createPost = catchAsync(async (req, res, next) => {
  const { source, data } = req.body;

  if (!source || !SOURCE_TO_MODEL_MAP[source]) {
    return next(
      new AppError("Invalid or missing source (use 'x' or 'news')", 400)
    );
  }

  const Model = SOURCE_TO_MODEL_MAP[source];
  console.log(Model, source, SOURCE_TO_MODEL_MAP["news"]);

  // Ensure the data contains valid articles
  if (!data || typeof data !== "object" || Object.keys(data).length === 0) {
    return next(new AppError("No data found to insert", 400));
  }

  const allPosts = [];

  // Iterate over each handle (e.g., "cnbc")
  for (const handle in data) {
    const articles = data[handle].articles;

    // Validate if articles exist
    if (!articles || !Array.isArray(articles) || articles.length === 0) {
      continue; // Skip this handle if no articles found
    }

    // Iterate over articles and prepare them for insertion
    for (const article of articles) {
      const { headline, location, lat, lng, link, time } = article;

      // If location is provided, try to geocode (if required)
      let geocodeLat = lat || null;
      let geocodeLng = lng || null;

      if (location && !lat && !lng) {
        try {
          const coords = await geocodeLocation(location);
          geocodeLat = coords.lat;
          geocodeLng = coords.lng;
        } catch (err) {
          return next(new AppError("Failed to geocode location", 400));
        }
      }

      // Prepare the post object for insertion
      allPosts.push({
        title: headline,
        link,
        time,
        location: location || null,
        lat: geocodeLat,
        lng: geocodeLng,
      });
    }
  }

  if (allPosts.length === 0) {
    return next(new AppError("No valid posts found to insert", 400));
  }
  console.log(Model);
  // Insert the posts using Model.insertMany()
  const insertedPosts = await Model.insertMany(allPosts, { ordered: false });

  console.log(insertedPosts);

  res.status(201).json({
    status: "success",
    insertedCount: insertedPosts.length,
    data: insertedPosts,
  });
});
