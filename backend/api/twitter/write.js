import { getDb } from "../../db/conn.js";
import { fetchTwitterApi } from "./api.js";
import { parseTwitterData } from "./parse.js";

export const writeTwitterDataToDb = async () => {
  const data = await fetchTwitterApi();
  const { query, trends: twitterTrends } = parseTwitterData(data);

  let dbConnect = await getDb();
  await dbConnect
    .collection("TwitterTrends")
    .insertMany(twitterTrends, (err, res) => {
      if (err) throw err;
      console.log(
        `Inserted *${res.insertedCount}* documents to collection 'TwitterTrends'`
      );
    });
  return twitterTrends;
};

export const clearTwitterCollections = async () => {
  let dbConnect = await getDb();
  dbConnect.collection("TwitterTrends").drop((err, delOK) => {
    if (err) console.error(err);
    if (delOK) console.log("Collection 'TwitterTrends' deleted");
  });
};
