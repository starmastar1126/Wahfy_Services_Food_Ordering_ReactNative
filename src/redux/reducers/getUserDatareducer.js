const initialState = {
    info: null
  }
  export default (state = initialState, action) => {
    switch (action.type) {
      case 'GET_USER_DATA':
        return {
          ...state,
          info: action.info
        }
      default:
        return state;
    }
  };