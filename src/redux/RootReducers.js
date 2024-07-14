import { combineReducers } from "redux";
import ProductReducer from "./products/Reducer";

const RootReducers = combineReducers({
  products: ProductReducer,
});

export default RootReducers;
