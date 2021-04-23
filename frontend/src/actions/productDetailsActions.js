import { productDetailsTypes } from "../types/productDetailsTypes";
import { productTypes } from "../types/productTypes";

export const productDetailsFailAction = (dispatch, data) => {
  const { PRODUCT_DETAILS_FAIL } = productDetailsTypes;

  dispatch({
    type: PRODUCT_DETAILS_FAIL,
    payload: data,
  });
};

export const productDetailsRequestAction = (dispatch) => {
  const { PRODUCT_DETAILS_REQUEST } = productDetailsTypes;

  dispatch({
    type: PRODUCT_DETAILS_REQUEST,
  });
};

export const productDetailsSuccessAction = (dispatch, data) => {
  const { PRODUCT_DETAILS_SUCCESS } = productDetailsTypes;

  dispatch({
    type: PRODUCT_DETAILS_SUCCESS,
    payload: data,
  });
};

// export const productDetailsClearErrorsAction = (dispatch) => {
//   const { CLEAR_ERRORS } = productTypes;

//   dispatch({
//     type: CLEAR_ERRORS,
//   });
// };
