import axios from "../helpers/axios";
import { categoryConstansts, productConstants } from "./constants";

export const getInitialData = () => {
  return async (dispatch) => {
    const res = await axios.get("/initialData");
    console.log(res);
    if (res.status === 200) {
      const { categories, products } = res.data;
      dispatch({
        type: categoryConstansts.GET_ALL_CATEGORIES_SUCCESS,
        payload: { categories },
      });
      dispatch({
        type: productConstants.GET_ALL_PRODUCTS_SUCCESS,
        payload: { products },
      });
    } else {
      if (res.status === 400) {
        dispatch({
          type: productConstants.GET_ALL_INITIAL_DATA_FAILURE,
          payload: { error: res.data.error },
        });
      }
    }
  };
};
