import express from "express";
import cors from "cors";
import "dotenv/config";
import twitterRouter from "./routes/twitter.js";
import { connectToDatabase } from "./db/conn.js";

const app = express();
const port = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());
app.use("/twitter", twitterRouter);
// get driver connection

app.listen(port, () => {
  // perform a database connection when server starts
  connectToDatabase(function (err) {
    if (err) console.error(err);
  });
  console.log(`Server is running on port: ${port}`);
});
