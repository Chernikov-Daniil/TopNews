export const apiUrlTopNews =
  "https://hacker-news.firebaseio.com/v0/newstories.json?print=pretty;";

export const apiUrlNews = (value) =>
  `https://hacker-news.firebaseio.com/v0/item/${value}.json?print=pretty`;

export const REQUEST_STATUS = {
  IDLE: 0,
  PENDING: 1,
  FAILURE: 2,
  SUCCESS: 3,
};
