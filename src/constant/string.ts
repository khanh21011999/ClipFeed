export const apiUrl = (page, per_page) => {
  return `https://stg.starzly.io/api/featured-videos?page=${page}&per_page=${per_page}&app=1&new=1`;
};
