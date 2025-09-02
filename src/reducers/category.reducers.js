/* eslint-disable default-case */
/* eslint-disable import/no-anonymous-default-export */
import { categoryConstansts } from "../actions/constants";

const initialState = {
  error: null,
  loading: false,
  categories: [],
};
export default (state = initialState, action) => {
  switch (action.type) {
    case categoryConstansts.GET_ALL_CATEGORIES_SUCCESS:
      state = {
        ...state,
        categories: action.payload.categories,
      };
      break;
    case categoryConstansts.ADD_NEW_CATEGORY_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case categoryConstansts.ADD_NEW_CATEGORY_SUCCESS:
      const category = action.payload.category;
      // const updatedCategories = buildNewCategories(category.parentId, state.categories, category);

      state = {
        ...state,
        categories: category,
        loading: false,
      };
      break;
    case categoryConstansts.ADD_NEW_CATEGORY_FAILURE:
      state = {
        ...initialState,
      };
      break;
  }

  return state;
};
