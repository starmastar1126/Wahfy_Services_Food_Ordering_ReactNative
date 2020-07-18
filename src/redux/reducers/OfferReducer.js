import {
  GETOFFERS,
  GETOFFERSMENU,
  START_LOADING,
  STOP_LOADING,
} from '../actions/types';

const INITIALSTATE = {
  offers: [],
  offersMenu: [],
  loading: false,
};

export default (state = INITIALSTATE, action) => {
  switch (action.type) {
    case START_LOADING:
      return {...state, loading: true};
    case GETOFFERS:
      return {
        ...state,
        offers: state.offers
          ? [state.offers, action.payload]
          : [...state.offers, action.payload],
        loading: false,
      };
    case GETOFFERSMENU:
      return {
        ...state,
        offersMenu: state.offersMenu
          ? [state.offersMenu, action.payload]
          : [...state.offersMenu, action.payload],
        loading: false,
      };
    default:
      return state;
  }
};
