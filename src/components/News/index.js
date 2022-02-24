import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearNews, getNews } from "../../store/news/actions";
import {
  selectErrorMessage,
  selectIsError,
  selectIsLoading,
  selectNews,
} from "../../store/news/selectors";
import "./news.css";

export const News = () => {
  const [count, setCount] = useState(0);

  const news = useSelector(selectNews);
  const errorMsg = useSelector(selectErrorMessage);
  const isLoading = useSelector(selectIsLoading);
  const isError = useSelector(selectIsError);
  const dispatch = useDispatch();

  const newsDate = (date) => {
    const getDate = new Date(date * 1000).toUTCString();
    return getDate;
  };

  useEffect(() => {
    let interval;
    dispatch(getNews());
    interval = setInterval(() => {
      dispatch(clearNews());
      setCount((prevCount) => prevCount + 1);
    }, 60000);
    return () => {
      clearInterval(interval);
    };
  }, [count]);

  const handleRefresh = () => {
    dispatch(clearNews());
    setCount((prevCount) => prevCount + 1);
  };

  return (
    <>
      <button className="btn" onClick={handleRefresh}>
        Refresh
      </button>
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
    </>
  );
};
