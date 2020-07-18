import React from 'react';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import {MenuTab} from './MenuTab';
import {CartTab} from './CartTab';
import {HomeTab} from './HomeTab';
import {MyOrdersTab} from './MyOrdersTab';
import {TabBar} from '../components';
import strings from '../strings';


export const TabNavigator = createBottomTabNavigator(
  {
    MenuTab: {
      screen: MenuTab,
      navigationOptions: () => ({
        tabBarIcon: ({focused}) => {
          return (
            <TabBar
              icon={'align-justify'}
              focused={focused}
              iconStyle={{width: 20, height: 20}}
              label={strings.menu}
            />
          );
        },
      }),
    },
    CartTab: {
      screen: CartTab,
      navigationOptions: () => ({
        tabBarIcon: ({focused}) => (
          <TabBar
            icon={'cart-plus'}
            focused={focused}
            iconStyle={{width: 20, height: 20}}
            label={strings.cart}
          />
        ),
        }),
    },
    HomeTab: {
      screen: HomeTab,
      navigationOptions: () => ({
        tabBarIcon: ({focused}) => (
          <TabBar
            icon={'home'}
            focused={focused}
            iconStyle={{width: 20, height: 20}}
            label={strings.home}
          />
        ),
      }),
    },
    MyOrdersTab: {
      screen: MyOrdersTab,
      navigationOptions: () => ({
        tabBarIcon: ({focused}) => (
          <TabBar
            icon={'tag'}
            focused={focused}
            iconStyle={{width: 20, height: 20}}
            label={strings.myOrders}
          />
        ),
      }),
    },
  },
  {
    tabBarOptions: {
      showLabel: false,
      activeTintColor: 'red',
    },
    resetOnBlur:true
  },
);
