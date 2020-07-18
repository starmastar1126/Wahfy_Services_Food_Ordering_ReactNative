import React from 'react';
import {createStackNavigator} from 'react-navigation-stack';
import Cart from '../screens/Cart';
import {DrawerIcon} from '../components/DrawerIcon';
import {colors} from '../constants';
import strings from '../strings';
import  Checkout  from '../screens/Checkout'


export const CartTab = createStackNavigator({
  Cart: {
    screen: Cart,
    navigationOptions: ({navigation}) => ({
      headerStyle: {backgroundColor: 'orange'},
      headerTintColor: colors.white,
      headerTitle: strings.cart,
      headerLeft: <DrawerIcon navigation={navigation} />,
    }),
  },
  Checkout: {
    screen: Checkout,
    navigationOptions: ({navigation}) => ({
      headerStyle: {backgroundColor: 'orange'},
      headerTintColor: colors.white,
      headerTitle: strings.checkout,
      headerLeft: <DrawerIcon navigation={navigation} />,
    }),
  }
});
