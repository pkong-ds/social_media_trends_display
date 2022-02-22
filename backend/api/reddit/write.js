import { getDb } from "../../db/conn.js";
import { fetchRedditApi } from "./api.js";

export const writeRedditDataToDb = async () => {
  const redditPosts = await fetchRedditApi();

  let dbConnect = await getDb();
  await dbConnect
    .collection("RedditTrends")
    .insertMany(redditPosts, (err, res) => {
      if (err) throw err;
      console.log(
        `Inserted *${res.insertedCount}* documents to collection 'RedditTrends'`
      );
    });
  return redditPosts;
};

export const clearRedditCollections = async () => {
  let dbConnect = await getDb();
  dbConnect.collection("RedditTrends").drop((err, delOK) => {
    if (err) console.error(err);
    if (delOK) console.log("Collection 'RedditTrends' deleted");
  });
};
