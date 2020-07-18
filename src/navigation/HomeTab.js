import React from 'react';
import {createStackNavigator} from 'react-navigation-stack';
import Home from '../screens/Home';
import {MyAddresses} from '../screens/MyAddresses';
import AddAddress from '../screens/AddAddress';

export const HomeTab = createStackNavigator({
  Home: {
    screen: Home,
    navigationOptions: {
      header: null
    }
  },
});
