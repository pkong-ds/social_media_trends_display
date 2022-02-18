import express from 'express';
import {getDb} from "../db/conn.js";
import mongodb from 'mongodb';

// indexRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /record.
export const indexRoutes = express.Router();

// This will help us connect to the database

// This help convert the id from string to ObjectId for the _id.
const ObjectId = mongodb.ObjectId;

indexRoutes.route("/").get(function (req, res) {
  let db_connect = getDb();
  db_connect
    .collection("records")
    .find({})
    .toArray(function (err, result) {
      if (err) throw err;
      res.json(result);
    });
});
