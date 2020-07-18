import {get_request} from '../../services/API';
import {CATEGORIES, GETMENU} from './types';

export const getCategories = ({token}) => async dispatch => {
  dispatch({type: START_LOADING})
  const categories = await get_request({target: 'menu/categories', token});
  console.log(categories)
//   try {
//     if (offers) {
//       dispatch({type: CATEGORIES, payload: offers.data.data});
//     }
//   } catch (error) {
//     console.log(error.message);
//   }
};

export const getOffersMenu = ({token, id, type}) => async dispatch => {
  dispatch({type: START_LOADING})
  const offersMenu = await get_request({
    target: `offers/${id}?now/type=${type}`,
    token,
  });
  try {
    if (offersMenu) {
      dispatch({type: GETOFFERSMENU, payload: offersMenu.data});
    }
  } catch (error) {
    console.log(error.message);
  }
};
