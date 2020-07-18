import {base_URL, post_request, get_request} from '../../services/API';
import {GETADDRESS, NEWADDRESS, DELETEADDRESS, START_LOADING} from './types';
import AsyncStorage from '@react-native-community/async-storage';


export const newAddress = ({
  name,
  street,
  building_number,
  floor_number,
  landmark,
  city_id,
  area_id,
  navigation,
  token,
}) => async dispatch => {
  //const token = await AsyncStorage.getItem('@TOKEN')
  const addressData = {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      Authorization: token ? `Bearer ${token}` : '',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name,
      street,
      building_number,
      floor_number,
      landmark,
      city_id,
      area_id,
    }),
  };
  const request = await fetch(`${base_URL}address`, addressData);
  const address = await request.json();
  console.log('address',address);
  try {
    if (address) {
      dispatch({type: NEWADDRESS, payload: address});
      navigation.navigate('Menu');
    }
  } catch (error) {
    console.log(err);
  }
};

export const getAddresses = () => async dispatch => {
  dispatch({type: START_LOADING})
  const myAddresses = await get_request({target: 'address'});
  // const token = await AsyncStorage.getItem('@TOKEN')
  // console.warn('getToken', token)
  // const request = await fetch(`${base_URL}address`, {
  //   method: 'GET',
  //   headers: {
  //     Authorization: token ? `Bearer ${JSON.parse(token)}` : '',
  //     Accept: 'application/json',
  //     'Content-Type': 'application/json',
  //   },
  // });
  console.log('requestrequest', myAddresses)
  // const myAddresses = await request.json();
  try {
    if (myAddresses) {
      dispatch({type: GETADDRESS, payload: myAddresses.data});
    }
  } catch (err) {
    console.log(err.message);
  }
};

export const deleteAddress = id => {
  return async dispatch => {
    await dispatch({type: DELETEADDRESS, payload: id});
  };
};
