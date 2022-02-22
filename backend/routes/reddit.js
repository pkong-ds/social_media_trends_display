import express from "express";
import mongodb from "mongodb";
import { readRedditDataFromDb } from "../api/reddit/read.js";
import {
  clearRedditCollections,
  writeRedditDataToDb,
} from "../api/reddit/write.js";

const redditRouter = express.Router();

const ObjectId = mongodb.ObjectId;

redditRouter.get("/write", async function (req, res) {
  clearRedditCollections().then(() => {
    writeRedditDataToDb().then(() => {
      res.end("New reddit trends fetched");
    });
  });
});

redditRouter.get("/read", async function (req, res) {
  const redditTrends = await readRedditDataFromDb();
  res.json(redditTrends);
});

export default redditRouter;
