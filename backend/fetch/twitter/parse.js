export const parseTwitterData = (data) => {
  const [query] = data;
  const { trends, as_of, created_at, locations } = query;
  const [location] = locations;
  const locationId = location.woeid;
  const newTrends = trends.map((t) => ({ ...t, locationId }));
  return {
    query: {
      asOf: as_of,
      createdAt: created_at,
      locationId,
    },
    trends: newTrends,
  };
};
