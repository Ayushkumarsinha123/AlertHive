const fs = require("fs");
const path = require("path")

const mongoose = require("mongoose");
const dotenv = require("dotenv");

// ADD the route to the model, which should be used to store the DATA
// const MODEL = require("./../../models/tourModel");
const MODEL = require("./../models/XDisasterPostModel")

// mongoose ID of handle that should be used
const HANDLE = "681a4f8fc2351bc5160f3221"

// PATH of JSON whose data is to be posted
const JSON_PATH = `${__dirname}/x.json`

dotenv.config({ path: path.resolve(__dirname, '../config.env') });

const DB = process.env.DATABASE.replace("<PASSWORD>", process.env.DB_PASSWORD);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log("DB connection successful!");
  });

// READ JSON FILE
const EXTRACTED_DATA = JSON.parse(
  fs.readFileSync(JSON_PATH, "utf-8")
);

// IMPORT DATA INTO DB
const importData = async () => {
  try {
    const DATA = extractX();
    await MODEL.create(DATA);
    console.log("Data successfully loaded!");
  } catch (error) {
    console.log(error);
  }
  process.exit();
};

// DELETE DATA FROM DB
const deleteData = async () => {
  try {
    await MODEL.deleteMany();
    console.log("Data successfully deleted!");
  } catch (error) {
    console.log(error);
  }
  process.exit();
};

// utility function to extract data from x.json
function extractX() {
  // Extracting articles
  const articles = EXTRACTED_DATA.data["@Top_Disaster"].articles;

  // Create a new array with modified data
  const updatedArticles = articles.map(article => ({
    title: article.headline, // Renaming 'headline' to 'title'
    content: article.content,
    link: article.link,
    time: article.time,
    xhandle: HANDLE // Adding the xhandle key
  }));

  return updatedArticles;
}

// process.argv to take input from command line
if (process.argv[2] === "--import") {
  importData();
} else if (process.argv[2] === "--delete") {
  deleteData();
}

