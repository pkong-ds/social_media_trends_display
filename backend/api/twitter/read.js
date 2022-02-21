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

  // .toArray((err, res) => {
  //   if (err) throw err;
  //   console.log({ res });
  //   console.log("Successfully retrived twitter trends from database.");
  //   return res;
  // });
};
// export const writeTwitterDataToDb = async () => {
//   const data = await fetchTwitterApi();
//   const { query, trends } = parseTwitterData(data);
//   clearTwitterCollections();
//   let dbConnect = getDb();
//   dbConnect.collection("TwitterTrends").insertMany(trends, (err, res) => {
//     if (err) throw err;
//     console.log(`Inserted *${res.insertedCount}* documents`);
//   });
//   return trends;
// };

// const clearTwitterCollections = () => {
//   let dbConnect = getDb();
//   dbConnect.collection("TwitterTrends").drop((err, delOK) => {
//     if (err) throw err;
//     if (delOK) console.log("Collection 'trends' deleted");
//   });
// };
