import {get_request} from '../../services/API';
import {GETBRANCHES, ADD_SERVICE_TYPE} from './types';

export const getBranches = () => async dispatch => {
  const branches = await get_request({target: 'branches'});
  try {
    if (branches) {
      dispatch({type: GETBRANCHES, payload: branches.data});
    }
  } catch (error) {
    alert(error.message);
  }
};
