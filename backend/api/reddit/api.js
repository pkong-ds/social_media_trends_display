import snoowrap from "snoowrap";
import "dotenv/config";

const mapPost = (p) => ({
  title: p.title,
  url: `https://www.reddit.com${p.permalink}`,
  score: p.score,
  numComments: p["num_comments"],
  createdUtc: p["created_utc"],
  subreddit: p.subreddit["display_name"],
});

export const fetchRedditApi = async () => {
  const r = new snoowrap({
    userAgent: "personal use script",
    clientId: process.env.REDDIT_CLIENT_ID,
    clientSecret: process.env.REDDIT_CLIENT_SECRET,
    username: process.env.REDDIT_USERNAME,
    password: process.env.REDDIT_PASSWORD,
  });

  const res = (await r.getSubreddit("popular").getHot()).map(mapPost);
  return res;
};
