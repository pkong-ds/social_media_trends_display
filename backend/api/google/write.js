import { getDb } from "../../db/conn.js";
import { fetchGoogleApi } from "./api.js";
import { parseGoogleData } from "./parse.js";

export const writeGoogleDataToDb = async () => {
  const data = await fetchGoogleApi();
  const googleTrends = parseGoogleData(data);
  let dbConnect = await getDb();
  await dbConnect
    .collection("GoogleTrends")
    .insertMany(googleTrends, (err, res) => {
      if (err) throw err;
      console.log(
        `Inserted *${res.insertedCount}* documents to collection 'GoogleTrends'`
      );
    });
  return googleTrends;
};

export const clearGoogleCollections = async () => {
  let dbConnect = await getDb();
  dbConnect.collection("GoogleTrends").drop((err, delOK) => {
    if (err) console.error(err);
    if (delOK) console.log("Collection 'GoogleTrends' deleted");
  });
};
