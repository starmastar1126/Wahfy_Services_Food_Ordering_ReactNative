import React from 'react';
import {createStackNavigator} from 'react-navigation-stack';
import Login from '../screens/Login';
import phoneVerification from '../screens/PhoneVerification';
import Signup from '../screens/Signup';
import Intro from '../screens/Intro';
import strings from '../strings';
import { colors } from '../constants';
import ResetPassword from '../screens/resetpassword'
import Splash from '../screens/Splash'

export const AuthNav = createStackNavigator(
  {
    splash:{
      screen: Splash,
      navigationOptions: {
        header: null,
      },
    },
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
    PhoneV: {
      screen: phoneVerification,
      navigationOptions: {
        headerStyle: {backgroundColor: 'orange'},
        headerTintColor: colors.white,
        headerTitle: strings.phoneVerification,
      },
    },
    resetPass: {
      screen: ResetPassword,
      navigationOptions: {
        headerStyle: {backgroundColor: 'orange'},
        headerTintColor: colors.white,
        headerTitle: strings.resetPassword,
      },
    },
  },
  {
    defaultNavigationOptions: () => ({
      headerBackTitle: null,
    }),
  },
);
