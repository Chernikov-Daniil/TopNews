import { REQUEST_STATUS } from "../../utils/constants";
import {
  CLEAR_NEWS,
  GET_NEWS_FAILURE,
  GET_NEWS_REQUEST,
  GET_NEWS_SUCCESS,
} from "./actions";

const initialState = {
  data: [],
  request: {
    error: "",
    status: REQUEST_STATUS.IDLE,
  },
};

export const newsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_NEWS_REQUEST:
      return {
        ...state,
        request: {
          error: "",
          status: REQUEST_STATUS.PENDING,
        },
      };
    case GET_NEWS_FAILURE:
      return {
        ...state,
        request: {
          error: action.payload,
          status: REQUEST_STATUS.FAILURE,
        },
      };
    case GET_NEWS_SUCCESS:
      return {
        data: [...state.data, action.payload],
        request: {
          error: "",
          status: REQUEST_STATUS.SUCCESS,
        },
      };
    case CLEAR_NEWS:
      return {
        ...state,
        data: [],
        request: {
          error: "",
          status: REQUEST_STATUS.IDLE,
        },
      };
    default:
      return state;
  }
};
