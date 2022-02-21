export const parseGoogleData = (data) => {
  const { storySummaries, date } = data;
  const { trendingStories } = storySummaries;
  const parsedStories = trendingStories.map((story, index) => {
    return {
      imageUrl: story.image.imgUrl ?? "",
      googleUrl: story.shareUrl ?? "",
      numArticles: story.articles?.length ?? 0,
      title: story.title,
      entityNames: story.entityNames,
      searchRank: index + 1,
    };
  });
  return parsedStories;
};
