import { combineReducers } from "redux";
import authReducers from "./auth.reducers";
import userReducers from "./user.reducers";
import orderReducers from "./order.reducers";
import categoryReducers from "./category.reducers";
import productReducers from "./product.reducers";

const rootReducer = combineReducers({
  auth: authReducers,
  user: userReducers,
  order: orderReducers,
  category: categoryReducers,
  product: productReducers,
});
export default rootReducer;
