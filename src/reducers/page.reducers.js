/* eslint-disable default-case */
/* eslint-disable import/no-anonymous-default-export */
import { pageConstants } from "../actions/constants";

const initialState = {
  error: null,
  loading: false,
  page: {},
};
export default (state = initialState, action) => {
  switch (action.type) {
    case pageConstants.CREATE_PAGE_REQUEST:
      state = { ...state, loading: true };
      break;
    case pageConstants.CREATE_PAGE_SUCCESS:
      state = { ...state, page: action.payload, loading: false };
      break;
    case pageConstants.CREATE_PAGE_FAILURE:
      state = { ...state, error: action.payload.error, loading: false };
      break;
  }

  return state;
};
