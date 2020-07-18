export const base_URL = 'http://wahfyservices.com/KOP/public/api/';
import AsyncStorage from '@react-native-community/async-storage';

export const get_request = async ({target}) => {
  const url = `${base_URL}${target}`;
  const token = await AsyncStorage.getItem('@TOKEN');
  try {
    const result = await fetch(url, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        Authorization: token ? `Bearer ${JSON.parse(token)}` : '', 
        'Content-Type': 'application/json',
      },
    }); 
    return await result.json();
  } catch (err) {}
};

export const post_request = async ({target, body = {}}) => {
  const url = `${base_URL}${target}`;
  const token = await AsyncStorage.getItem('@TOKEN');
  try {
    const result = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: token ? `Bearer ${token}` : '',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
    return await result.json();
  } catch (err) {}
};
