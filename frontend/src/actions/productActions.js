import { productTypes } from "../types/productTypes";

export const productFailAction = (dispatch, data) => {
  const { ALL_PRODUCT_FAIL } = productTypes;

  dispatch({
    type: ALL_PRODUCT_FAIL,
    payload: data,
  });
};

export const productRequestAction = (dispatch) => {
  const { ALL_PRODUCT_REQUEST } = productTypes;

  dispatch({
    type: ALL_PRODUCT_REQUEST,
  });
};

export const productSuccessAction = (dispatch, data) => {
  const { ALL_PRODUCT_SUCCESS } = productTypes;

  dispatch({
    type: ALL_PRODUCT_SUCCESS,
    payload: data,
  });
};

export const productClearErrorsAction = (dispatch) => {
  const { CLEAR_ERRORS } = productTypes;

  dispatch({
    type: CLEAR_ERRORS,
  });
};
