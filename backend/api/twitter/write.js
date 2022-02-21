import { getDb } from "../../db/conn.js";
import { fetchTwitterApi } from "./api.js";
import { parseTwitterData } from "./parse.js";

export const writeTwitterDataToDb = async () => {
  const data = await fetchTwitterApi();
  const { query, trends } = parseTwitterData(data);
  let dbConnect = await getDb();
  await dbConnect.collection("trends").insertMany(trends, (err, res) => {
    if (err) throw err;
    console.log(`Inserted *${res.insertedCount}* documents`);
  });
  return trends;
};

export const clearTwitterCollections = async () => {
  let dbConnect = await getDb();
  dbConnect.collection("trends").drop((err, delOK) => {
    if (err) throw err;
    if (delOK) console.log("Collection 'trends' deleted");
  });
};
