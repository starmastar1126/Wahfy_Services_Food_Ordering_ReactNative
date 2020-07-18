import React from 'react';
import {createStackNavigator} from 'react-navigation-stack';
import Login from '../screens/Login';
import Signup from '../screens/Signup';
import Intro from '../screens/Intro';
import strings from '../strings';


export const AuthNav = createStackNavigator(
  {
    Intro: {
      screen: Intro,
      navigationOptions: {
        header: null,
      },
    },
    Login: {
      screen: Login,
      navigationOptions: {
        header: null,
      },
    },
    Signup: {
      screen: Signup,
      navigationOptions: {
        headerTitle: strings.signup,
      },
    },
    
  },
  {
    defaultNavigationOptions: () => ({
      headerBackTitle: null,
    }),
  },
);
