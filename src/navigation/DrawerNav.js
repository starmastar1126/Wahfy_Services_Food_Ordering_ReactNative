import React from 'react';
import {I18nManager} from 'react-native'
import {createDrawerNavigator} from 'react-navigation-drawer';
import {TabNavigator} from './TabNavigator';
import SideMenu from '../components/SideMenu';

const{isRTL} = I18nManager

export const DrawerNav = createDrawerNavigator(
  {
    TabNavigator: {
      screen: TabNavigator,
    },
  },
  {
    drawerPosition: isRTL ?'right': 'left',
    drawerWidth: 220,
    contentComponent: SideMenu,
    drawerBackgroundColor: 'transparent',
  },
);
