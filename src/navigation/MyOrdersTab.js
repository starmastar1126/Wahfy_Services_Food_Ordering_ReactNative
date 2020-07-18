import React from 'react'
import {createStackNavigator} from 'react-navigation-stack';
import {MyOrders} from '../screens/MyOrders';
import { DrawerIcon } from '../components/DrawerIcon';
import { colors } from '../constants';
import  strings  from '../strings';

export const MyOrdersTab = createStackNavigator({
  MyOrders: {
    screen: MyOrders,
    navigationOptions: ({navigation}) => ({
      headerStyle: {backgroundColor: 'orange'},
      headerTintColor: colors.white,
      headerTitle: strings.myOrders,
      headerLeft: <DrawerIcon navigation={navigation} />,
    }),
  },
},{
  defaultNavigationOptions: () => ({
    headerBackTitle: null
  })
});
