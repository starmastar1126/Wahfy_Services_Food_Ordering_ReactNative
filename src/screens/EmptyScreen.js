import React, {Component} from 'react';
import {View, Text, Image} from 'react-native';
import strings from '../strings';
import {vScale, hScale} from 'step-scale';

export const EmptyScreen = props => {
  const {image, text} = props;
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Image source={image} style={{width: hScale(150), height: vScale(150)}} />
      <Text style={{fontSize: 20, marginTop: vScale(20), fontWeight: '600'}}>{text}</Text>
    </View>
  );
};
