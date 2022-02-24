import { apiUrlNews, apiUrlTopNews } from "../../utils/constants";

export const GET_NEWS_REQUEST = "NEWS::GET_NEWS_REQUEST";
export const GET_NEWS_SUCCESS = "NEWS::GET_NEWS_SUCCESS";
export const GET_NEWS_FAILURE = "NEWS::GET_NEWS_FAILURE";

export const getNewsRequest = () => ({
  type: GET_NEWS_REQUEST,
});

export const getNewsSuccess = (data) => ({
  type: GET_NEWS_SUCCESS,
  payload: data,
});

export const getNewsFailure = (err) => ({
  type: GET_NEWS_FAILURE,
  payload: err,
});

export const getNews = () => async (dispatch) => {
  dispatch(getNewsRequest());

  try {
    const responseTopNews = await fetch(apiUrlTopNews);
    const resultTopNews = await responseTopNews.json();
    const sortNewNews = resultTopNews.slice(0, 100);

    for (let item of sortNewNews) {
      const response = await fetch(apiUrlNews(item));
      const result = await response.json();
      dispatch(getNewsSuccess(result));
    }
  } catch (e) {
    dispatch(getNewsFailure(e.message));
  }
};
