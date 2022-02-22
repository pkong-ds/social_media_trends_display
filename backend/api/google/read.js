import { getDb } from "../../db/conn.js";

export const readGoogleDataFromDb = async () => {
  let dbConnect = await getDb();
  try {
    const ascSearchRankSort = { searchRank: 1 };
    const findResult = await dbConnect
      .collection("GoogleTrends")
      .find()
      .sort(ascSearchRankSort)
      .toArray();
    console.log("Successfully retrived google trends from database.");
    return findResult;
  } catch (err) {
    console.error(err);
    return [];
  }
};
