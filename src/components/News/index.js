import { useEffect, useState } from "react";
import "./news.css";

export const News = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(false);

  const newsDate = (date) => {
    const getDate = new Date(date * 1000).toUTCString();
    return getDate;
  };

  const getTopNews = async () => {
    try {
      const responseTopNews = await fetch(
        `https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty`
      );
      const resultTopNews = await responseTopNews.json();
      const sortTopNews = resultTopNews.sort((a, b) => b - a).slice(0, 100);

      for (let item of sortTopNews) {
        const response = await fetch(
          `https://hacker-news.firebaseio.com/v0/item/${item}.json?print=pretty`
        );
        const result = await response.json();
        setNews((prevNews) => [...prevNews, result]);
      }
      setNews((prevNews) =>
        prevNews.sort((a, b) => (a.time > b.time ? 1 : -1))
      );
      setLoading(true);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getTopNews();
    return setNews([]);
  }, []);

  return !loading ? (
    <h3>Loading..</h3>
  ) : (
    <ol className="list">
      {news?.map((item) => (
        <li className="list-item" key={item.id}>
          <div className="title">{item.title}</div>
          <div className="score">{item.score} points</div>
          <div className="nickname">{item.by}</div>
          <div className="time">{newsDate(item.time)}</div>
        </li>
      ))}
    </ol>
  );
};
