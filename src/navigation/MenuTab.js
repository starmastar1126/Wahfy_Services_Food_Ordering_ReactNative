import React from 'react';
import {createStackNavigator} from 'react-navigation-stack';
import Menu from '../screens/Menu';
import {DrawerIcon} from '../components/DrawerIcon';
import {colors} from '../constants';
import strings from '../strings';
import ProductDetails from '../screens/ProductDetails';

export const MenuTab = createStackNavigator({
  Menu: {
    screen: Menu,
    navigationOptions: ({navigation}) => ({
      headerStyle: {backgroundColor: 'orange'},
      headerTintColor: colors.white,
      headerTitle: strings.menu,
      headerLeft: <DrawerIcon navigation={navigation} />,
    }),
  },
  ProductDetails: {
    screen: ProductDetails,
    navigationOptions: ({navigation}) => ({
      headerStyle: {backgroundColor: 'orange'},
      headerTintColor: colors.white,
      headerTitle: strings.productDetails,
    }),
  },
},{
  defaultNavigationOptions: () => ({
    headerBackTitle: null
  })
});
