import googleTrends from "google-trends-api";

export const fetchGoogleApi = async () => {
  const res = await googleTrends
    .realTimeTrends({
      geo: "US",
      category: "all",
    })
    .catch(console.error);
  return JSON.parse(res);
};
