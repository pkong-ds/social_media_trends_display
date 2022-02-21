import express from "express";
import mongodb from "mongodb";
import { readTwitterDataFromDb } from "../api/twitter/read.js";
import {
  clearTwitterCollections,
  writeTwitterDataToDb,
} from "../api/twitter/write.js";

// twitterRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /record.
const twitterRouter = express.Router();

// This will help us connect to the database

// This help convert the id from string to ObjectId for the _id.
const ObjectId = mongodb.ObjectId;

twitterRouter.get("/write", async function (req, res) {
  clearTwitterCollections().then(() => {
    writeTwitterDataToDb().then(() => {
      res.end("New twitter trends fetched");
    });
  });
});

twitterRouter.get("/read", async function (req, res) {
  const twitterTrends = await readTwitterDataFromDb();
  res.json(twitterTrends);
});

export default twitterRouter;
