import {
  START_LOADING,
  STOP_LOADING,
  LOGINSUCCESS,
  LOGINFAILED,
  REGISTERSUCCESS,
  REGISTERFAILED,
  LOGOUT,
} from '../actions/types';

const INITIALSTATE = {
  user: null,
  loading: false,
  error: '',
};

export default (state = INITIALSTATE, action) => {
  switch (action.type) {
    case START_LOADING:
      return {...state, loading: true};
    case STOP_LOADING:
      return {...state, loading: false};
    case LOGINSUCCESS:
      return {...state, loading: false, user: action.payload};
    case LOGINFAILED:
      return {...state, loading: false, error: 'Email or Password invalid'};
    case REGISTERSUCCESS:
      return {...state, loading: false, user: action.payload};
    case REGISTERFAILED:
      return {...state, loading: false};
    case LOGOUT:
      return state;
    default:
      return state;
  }
};
