import express from "express";
import mongodb from "mongodb";
import { readGoogleDataFromDb } from "../api/google/read.js";
import {
  clearGoogleCollections,
  writeGoogleDataToDb,
} from "../api/google/write.js";

const googleRouter = express.Router();

const ObjectId = mongodb.ObjectId;

googleRouter.get("/write", async function (req, res) {
  clearGoogleCollections().then(() => {
    writeGoogleDataToDb().then(() => {
      res.end("New google trends fetched");
    });
  });
});

googleRouter.get("/read", async function (req, res) {
  const googleTrends = await readGoogleDataFromDb();
  res.json(googleTrends);
});

export default googleRouter;
