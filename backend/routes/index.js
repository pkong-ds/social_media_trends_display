import express from "express";
import mongodb from "mongodb";
import { writeTwitterDataToDb } from "../fetch/twitter/write.js";

// indexRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /record.
export const indexRoutes = express.Router();

// This will help us connect to the database

// This help convert the id from string to ObjectId for the _id.
const ObjectId = mongodb.ObjectId;

indexRoutes.route("/").get(async function (req, res) {
  const twitterTrends = await writeTwitterDataToDb();
  res.json(twitterTrends);
});
