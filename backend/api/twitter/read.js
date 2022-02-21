import { getDb } from "../../db/conn.js";

export const readTwitterDataFromDb = async () => {
  let dbConnect = await getDb();
  try {
    const descVolumeSort = { tweet_volume: -1 };
    const findResult = await dbConnect
      .collection("TwitterTrends")
      .find()
      .sort(descVolumeSort)
      .toArray();
    console.log("Successfully retrived twitter trends from database.");
    return findResult;
  } catch (err) {
    console.error(err);
    return [];
  }
};
