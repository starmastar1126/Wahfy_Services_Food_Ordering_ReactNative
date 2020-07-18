import {GETADDRESS, NEWADDRESS, DELETEADDRESS} from '../actions/types';

const INITIALSTATE = {
  address: {},
  myAddresses: [],
};

export default (state = INITIALSTATE, action) => {
  switch (action.type) {
    case NEWADDRESS:
      return {...state, address: action.payload};
    case GETADDRESS:
      return {
        ...state,
        myAddresses: [...myAddresses, action.payload],
      };
    case DELETEADDRESS:
      return {
        ...state,
        myAddresses: state.myAddresses.filter(
          item => item.id != action.payload,
        ),
      };
    default:
      return state;
  }
};
