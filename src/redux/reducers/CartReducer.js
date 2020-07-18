import {
  ADDTOCART,
  REMOVEFROMCART,
  INCREMENTCART,
  DECREMENTCART,
  CATEGORIES,
  GETMENU,
  CATEGORIES_LOADING,
  GET_EXTRAS,
  GET_PRODUCT,
  ADD_EXTRAS,
  ADD_SERVICE_TYPE,
} from '../actions/types';

const initialState = {
  categories: [],
  subCategory: [],
  cart: [],
  loading: false,
  selectedProduct: null,
  address_branch: null,
  extras: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case CATEGORIES_LOADING:
      return {...state, loading: true};
    case CATEGORIES:
      return {
        ...state,
        categories: [...state.categories, action.payload],
        loading: false,
      };
    case GETMENU:
      return {
        ...state,
        subCategory: state.subCategory
          ? [state.subCategory, action.payload]
          : [...state.subCategory, action.payload],
        loading: false,
      };
    case GET_PRODUCT:
      return {
        ...state,
        selectedProduct: {productItem: action.payload},
      };

    case GET_EXTRAS:
      return {
        ...state,
        extras: state.extras
          ? [state.extras, action.payload]
          : [...state.extras, action.payload],
      };
    case ADD_EXTRAS:
      return {
        ...state,
        cart: [
          ...state.cart,
          {
            extras: action.payload,
          },
        ],
      };
    case ADDTOCART:
      return {
        ...state,
        cart: [
          ...state.cart,
          {
            product: action.payload,
            qty: 1,
          },
        ],
      };
    case REMOVEFROMCART:
      return {
        ...state,
        cart: state.cart.filter(
          element => element.product.id !== action.payload,
        ),
      };
    case INCREMENTCART:
      return {
        ...state,
        cart: action.payload,
      };
    case DECREMENTCART:
      return {
        ...state,
        cart: action.payload,
      };
    case ADD_SERVICE_TYPE:
      return {
        ...state,
        address_branch: {address_branch: action.payload},
      };
    default:
      return state;
  }
};
