import { getDb } from "../../db/conn.js";

export const readRedditDataFromDb = async () => {
  let dbConnect = await getDb();
  try {
    const descScoreSort = { score: -1 };
    const findResult = await dbConnect
      .collection("RedditTrends")
      .find()
      .sort(descScoreSort)
      .toArray();
    console.log("Successfully retrived reddit trends from database.");
    return findResult;
  } catch (err) {
    console.error(err);
    return [];
  }
};
