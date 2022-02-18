import { getDb } from "../../db/conn.js";
import { fetchTwitterApi } from "./api.js";
import { parseTwitterData } from "./parse.js";

export const writeTwitterDataToDb = async () => {
  const data = await fetchTwitterApi();
  const { query, trends } = parseTwitterData(data);
  clearDb();
  let db_connect = getDb();
  db_connect.collection("trends").insertMany(trends, (err, res) => {
    if (err) throw err;
    console.log(`Inserted *${res.insertedCount}* documents`);
  });
  return trends;
};

const clearDb = () => {
  let db_connect = getDb();
  db_connect.collection("trends").drop((err, delOK) => {
    if (err) throw err;
    if (delOK) console.log("Collection 'trends' deleted");
  });
};
