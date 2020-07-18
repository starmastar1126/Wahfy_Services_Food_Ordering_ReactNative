import {GET_EXTRAS, GET_PRODUCT, ADD_EXTRAS} from '../actions/types';

const initialState = {
  selectedProduct: null,
  extras: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_PRODUCT:
      return {
        ...state,
        selectedProduct: {productItem: action.payload},
      };

    case ADD_EXTRAS:
      return {
        ...state,
        selectedProduct: {productItem: action.payload, extras: {}},
      };
    case GET_EXTRAS:
      return {
        ...state,
        extras: state.extras
          ? [state.extras, action.payload]
          : [...state.extras, action.payload],
      };
    default:
      return state;
  }
};
