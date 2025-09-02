/* eslint-disable default-case */
/* eslint-disable import/no-anonymous-default-export */
import { authConstants, userConstants } from "../actions/constants";

const initialState = {
  error: null,
  message: "",
  loading: false,
};
export default (state = initialState, action) => {
  switch (action.type) {
    case userConstants.USER_REGISTER_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case userConstants.USER_REGISTER_SUCCESS:
      state = {
        ...state,
        loading: false,
        message: action.payload.message,
      };
      break;
    case userConstants.USER_REGISTER_FAILURE:
      state = {
        ...state,
        loading: false,
        message: action.payload.error,
      };
      break;
  }
  return state;
};
