import { legacy_createStore as createStore } from "redux";
import RootReducers from "../RootReducers";

const store = createStore(
  RootReducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
