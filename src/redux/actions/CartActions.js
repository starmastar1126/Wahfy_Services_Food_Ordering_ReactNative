import {
  CATEGORIES_LOADING,
  ADDTOCART,
  INCREMENTCART,
  DECREMENTCART,
  REMOVEFROMCART,
  CATEGORIES,
  GETMENU,
  GET_PRODUCT,
  GET_EXTRAS,
  ADD_EXTRAS,
  ADD_SERVICE_TYPE,
} from './types';
import {get_request} from '../../services/API';

export const fetchCategories = ({token}) => async dispatch => {
  dispatch({type: CATEGORIES_LOADING});
  try {
    const categories = await get_request({target: 'menu/categories', token});
    if (categories) {
      dispatch({type: CATEGORIES, payload: categories.data});
    }
  } catch (error) {
    console.log(error.message);
  }
};

export const getMenu = ({catId}) => async dispatch => {
  dispatch({type: CATEGORIES_LOADING});
  try {
    const subCategory = await get_request({
      target: `menu/categories/${catId}/items`,
    });
    if (subCategory) {
      dispatch({type: GETMENU, payload: subCategory.data});
    }
  } catch (error) {
    console.log(error.message);
  }
};

export const get_product = item => { 
  return {
    type: GET_PRODUCT,
    payload: item,
  };
};

export const getExtras = ({token, catId}) => async dispatch => {
  const extras = await get_request({
    target: `menu/categories/${catId}/extras`,
    token,
  });
  try {
    if (extras) {
      dispatch({type: GET_EXTRAS, payload: extras.data});
    }
  } catch (error) {
    console.log(error.message);
  }
};
export const add_extras_to_item = (item, cart) => {
  console.warn('item cart', item);
  const itemIndex = cart.findIndex(e => e.id === item.id);
  console.warn('index', itemIndex);
  if (itemIndex !== -1) {
    cart[itemIndex].extras = item;
  }
  return async dispatch => {
    await dispatch({
      type: ADD_EXTRAS,
      payload: item,
    });
  };
};

export const addToCart = item => {
  return async dispatch => {
    await dispatch({
      type: ADDTOCART,
      payload: item,
    });
  };
};

export const removeFromCart = id => {
  return async dispatch => {
    await dispatch({type: REMOVEFROMCART, payload: id});
  };
};

export const incermentCount = (item, cart) => {
  const index = cart.findIndex(e => e.product.id === item.product.id);
  cart[index].qty = index !== -1 ? item.qty + 1 : 0;
  return async dispatch => {
    await dispatch({type: INCREMENTCART, payload: cart});
  };
};

export const decermentCount = (item, cart) => {
  const index = cart.findIndex(e => e.product.id === item.product.id);
  cart[index].qty = index !== -1 ? item.qty - 1 : 0;
  return async dispatch => {
    await dispatch({
      type: DECREMENTCART,
      payload: cart,
    });
  };
};

export const add_service_type = item => {
  return {
    type: ADD_SERVICE_TYPE,
    payload: item,
  };
};
