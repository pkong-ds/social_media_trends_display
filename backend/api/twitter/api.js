import fetch from "node-fetch";
import "dotenv/config";

const WOEID = "23424975"; // location id to query popular trends on twitter, see https://blog.twitter.com/engineering/en_us/a/2010/woeids-in-twitters-trends for all available locations
const API = `https://api.twitter.com/1.1/trends/place.json?id=${WOEID}`;

export const fetchTwitterApi = async () => {
  const res = await fetch(API, {
    method: "get",
    headers: {
      Authorization: `Bearer ${process.env.TWITTER_BEARER_TOKEN}`,
    },
  });
  const data = await res.json();
  return data;
};
