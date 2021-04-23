import { productDetailsTypes } from "../types/productDetailsTypes";
import { productTypes } from "../types/productTypes";

const initialState = {
  product: {},
};

export const productDetailsReducers = (state = initialState, action) => {
  const {
    PRODUCT_DETAILS_FAIL,
    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
  } = productDetailsTypes;
  const { CLEAR_ERRORS } = productTypes;

  switch (action.type) {
    case PRODUCT_DETAILS_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case PRODUCT_DETAILS_SUCCESS:
      return {
        loading: false,
        product: action.payload.product,
      };
    case PRODUCT_DETAILS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};
