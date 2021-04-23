import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { productReducers } from "./reducers/productReducers";
import { productDetailsReducers } from "./reducers/productDetailsReducer";

// let initialState = {
//   cart: {
//     cartItems: localStorage.getItem("cartItems")
//       ? JSON.parse(localStorage.getItem("cartItems"))
//       : [],
//     shippingInfo: localStorage.getItem("shippingInfo")
//       ? JSON.parse(localStorage.getItem("shippingInfo"))
//       : {},
//   },
// };

const reducer = combineReducers({
  products: productReducers,
  productDetails: productDetailsReducers,
});

const middleware = [thunk];
const store = createStore(
  reducer,
  //   initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
