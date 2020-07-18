import {GETBRANCHES} from '../actions/types';

const INITIALSTATE = {
  branches: [],
};

export default (state = INITIALSTATE, action) => {
  switch (action.type) {
    case GETBRANCHES:
      return {
        ...state,
        branches: state.branches
          ? [state.branches, action.payload]
          : [...state.branches, action.payload],
      };
    default:
      return state;
  }
};
