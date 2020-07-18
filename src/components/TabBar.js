import React from 'react';
import {View, Text} from 'react-native';
import {colors} from '../constants/color';
import Icon from 'react-native-vector-icons/FontAwesome';

export const TabBar = props => {
  const {icon, iconStyle, focused, label} = props;
  return (
    <View style={{alignItems: 'center', justifyContent: 'center'}}>
      <Icon
        name={icon}
        size={18}
        color={'gray'}
        style={[iconStyle, focused && {color: colors.buttonBG}]}
      />
      <Text style={{color: focused ? colors.buttonBG: 'gray'}}>{label}</Text>
    </View>
  );
};
