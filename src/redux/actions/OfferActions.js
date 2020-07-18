import {get_request} from '../../services/API';
import {GETOFFERS, GETOFFERSMENU, START_LOADING} from './types';

export const getOffers = ({token}) => async dispatch => {
  dispatch({type: START_LOADING})
  const offers = await get_request({target: 'offers', token});
  console.log(offers)
  try {
    if (offers) {
      dispatch({type: GETOFFERS, payload: offers.data.data});
    }
  } catch (error) {
    console.log(error.message);
  }
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
