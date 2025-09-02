import axios from "../helpers/axios";
import { authConstants } from "./constants";

export const login = (user) => {
  return async (dispatch) => {
    dispatch({ type: authConstants.LOGIN_REQUEST });
    const res = await axios.post("/admin/signin", {
      email: user.email,
      password: user.password,
    });
    if (res.status === 200) {
      const { token, user } = res.data;
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      dispatch({
        type: authConstants.LOGIN_SUCCESS,
        payload: {
          token,
          user,
        },
      });
    } else {
      if (res.status === 400) {
        dispatch({
          type: authConstants.LOGIN_FAILURE,
          payload: res.data.error,
        });
      }
    }
    dispatch({
      type: authConstants.LOGIN_REQUEST,
      payload: {
        ...user,
      },
    });
  };
};
export const isUserLoggegIn = () => {
  return async (dispatch) => {
    const token = localStorage.getItem("token");
    if (token) {
      const user = JSON.parse(localStorage.getItem("user"));
      dispatch({
        type: authConstants.LOGIN_SUCCESS,
        payload: { token, user },
      });
    } else {
      dispatch({
        type: authConstants.LOGIN_FAILURE,
        payload: { error: "Failed to Login" },
      });
    }
  };
};

export const signout = () => {
  return async (dispatch) => {
    dispatch({
      type: authConstants.LOGOUT_REQUEST,
    });
    const res = await axios.post("/admin/signout");
    if (res.status === 200) {
      dispatch({
        type: authConstants.LOGOUT_SUCCESS,
      });
      localStorage.clear();
    } else {
      dispatch({
        type: authConstants.LOGOUT_FAILURE,
      });
    }
  };
};
