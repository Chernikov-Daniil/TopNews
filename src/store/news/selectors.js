import { REQUEST_STATUS } from "../../utils/constants";

export const selectNews = (state) => state.news.data;
export const selectErrorMessage = (state) => state.news.request.error;
export const selectIsLoading = (state) =>
  state.news.request.status === REQUEST_STATUS.PENDING;
export const selectIsError = (state) =>
  state.news.request.status === REQUEST_STATUS.FAILURE;
