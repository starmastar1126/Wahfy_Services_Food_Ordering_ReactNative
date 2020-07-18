import React from 'react';
import {createStackNavigator} from 'react-navigation-stack';
import AddAddress from '../screens/AddAddress';
import MyAddresses from '../screens/MyAddresses';
import Branches from '../screens/Branches';
import Offers from '../screens/Offers'
import Cart from '../screens/Cart';
import Menu from '../screens/Menu';
import { DrawerNav } from './DrawerNav';
import ProductDetails from '../screens/ProductDetails';
import  strings  from '../strings';
import { colors } from '../constants';
import Profile from '../screens/Profile';
import EditProfile from '../screens/EditProfile'
import OffersMenu from '../screens/OffersMenu';
import OrderDetails from '../screens/OrderDetails'
import { LangSwitcher } from '../screens/LanguageSwitcher';

export const MainStack = createStackNavigator({
  DrawerNav: {
    screen: DrawerNav,
    navigationOptions: {
      header: null
    }
  },
  AddAddress: {
    screen: AddAddress
  },
  MyAddresses: {
    screen: MyAddresses,
  },
  Branches: {
    screen: Branches,
    navigationOptions: ({navigation}) => ({
      headerStyle: {backgroundColor: 'orange'},
      headerTintColor: colors.white,
      headerTitle: strings.branches,
    }),
  },
  Offers: {
      screen: Offers,
      navigationOptions: ({navigation}) => ({
        headerStyle: {backgroundColor: 'orange'},
        headerTintColor: colors.white,
        headerTitle: strings.offers,
      }),
  },
  OffersMenu: {
    screen: OffersMenu,
    navigationOptions: ({navigation}) => ({
      headerStyle: {backgroundColor: 'orange'},
      headerTintColor: colors.white,
      headerTitle: strings.offersMenu,
    }),
},
  Cart: {
      screen: Cart
  },
  Menu: {
    screen: Menu
  },
  ProductDetails: {
    screen: ProductDetails
  },
  Profile: {
    screen: Profile,
    navigationOptions: ({navigation}) => ({
      headerStyle: {backgroundColor: 'orange'},
      headerTintColor: colors.white,
      headerTitle: strings.profile,
    }),
  },
  EditProfile: {
    screen: EditProfile,
    navigationOptions: ({navigation}) => ({
      headerStyle: {backgroundColor: 'orange'},
      headerTintColor: colors.white,
      headerTitle: strings.editProfile,
    }),
  },
  OrderDetails: {
    screen: OrderDetails,
    navigationOptions: ({navigation}) => ({
      headerStyle: {backgroundColor: 'orange'},
      headerTintColor: colors.white,
      headerTitle: strings.orderDetails,
    })
},
  LanguageSwitcher: {
    screen: LangSwitcher,
    navigationOptions: ({navigation}) => ({
      headerStyle: {backgroundColor: 'orange'},
      headerTintColor: colors.white,
      headerTitle: strings.languages,
    }),
  }

},{
  defaultNavigationOptions: () => ({
    headerBackTitle: null
  })
});
