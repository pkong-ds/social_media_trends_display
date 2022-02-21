import { MongoClient } from "mongodb";
const Db = process.env.ATLAS_URI;
const client = new MongoClient(Db, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

var _db;

export const connectToDatabase = (callback) => {
  client.connect(function (err, db) {
    // Verify we got a good "db" object
    if (db) {
      _db = db.db("SocialMediaTrendCluster");
      console.log("Successfully connected to MongoDB.");
    }
    return callback(err);
  });
};
export const getDb = async () => {
  return _db;
};
