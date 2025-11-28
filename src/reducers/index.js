import { combineReducers } from "redux";
import categoryReducers from "./category.reducers";
import productReducers from "./product.reducer";
import authReducers from "./auth.reducer";
import cartReducer from "./cart.reducer";
import userReducer from "./user.reducer";

const rootReducer = combineReducers({
  category: categoryReducers,
  product: productReducers,
  auth: authReducers,
  cart: cartReducer,
  user: userReducer,
});
export default rootReducer;
