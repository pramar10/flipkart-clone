import axios from "../helpers/axios";
import { productConstants } from "./constants";

export const addProduct = (form) => {
  return async (dispatch) => {
    // dispatch({ type: productConstants.A });
    const res = await axios.post("product/create", form);
    console.log(res);
    // if (res.status === 201) {
    //   dispatch({
    //     type: productConstants.ADD_NEW_CATEGORY_SUCCESS,
    //     payload: { category: res.data.category },
    //   });
    // } else {
    //   dispatch({
    //     type: productConstants.ADD_NEW_CATEGORY_FAILURE,
    //     payload: res.data.error,
    //   });
    // }
  };
};
