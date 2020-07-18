import React from 'react';
import {View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {images} from '../assets';
import {colors} from '../constants';

export const CartCard = props => {
  const {
    container,
    imageStyle,
    countItemContainer,
    headContainerStyle,
    headTextsStyle,
    iconContainer,
  } = styles;
  const {item} = props;
  const {image, name_en, price, extras, calories} = item;
  return (
    <View style={container}>
      <View style={{flexDirection: 'row'}}>
        <Image source={images.food_1} style={imageStyle} />
        <View style={{marginStart: 10}}>
          <View style={headContainerStyle}>
            <Text style={headTextsStyle}>{name_en}</Text>
            <View style={countItemContainer}>
              <TouchableOpacity style={iconContainer}>
                <Icon name="minus" size={14} color={colors.black} />
              </TouchableOpacity>
              <Text style={{fontSize: 15, fontWeight: 'bold'}}>1</Text>
              <TouchableOpacity style={iconContainer}>
                <Icon name="plus" size={14} color={colors.black} />
              </TouchableOpacity>
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              marginVertical: 8,
              width: 215,
              justifyContent: 'flex-end',
            }}>
            <Text
              style={{fontSize: 13, fontWeight: '500', color: colors.buttonBG}}>
              Cal : {calories}
            </Text>
            <Text
              style={{
                fontSize: 13,
                fontWeight: '500',
                color: 'green',
                marginStart: 30,
              }}>
              price : {price}
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              marginVertical: 10,
              width: 220,
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <Text
              style={{
                fontSize: 13,
                fontWeight: '500',
                marginVertical: 2,
                color: '#BF2626',
              }}>
              Extra
            </Text>
            <Text
              style={{fontSize: 13, fontWeight: '500', color: colors.buttonBG}}>
              Cal : 100
            </Text>
            <Text style={{fontSize: 13, fontWeight: '500', color: 'green'}}>
              price : 600
            </Text>
          </View>
          <Text
            style={{width: 240, marginVertical: 10, color: colors.buttonBG}}>
            ----------------------------------
          </Text>

          <View
            style={{
              width: 220,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <Text style={{fontSize: 16, fontWeight: 'bold', color: '#BF2626'}}>
              Total :
            </Text>
            <Text
              style={{
                fontSize: 16,
                fontWeight: 'bold',
                color: '#BF2626',
              }}>
              SA 15000
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '95%',
    minHeight: 90,
    borderWidth: 0.5,
    borderRadius: 10,
    alignSelf: 'center',
    marginTop: 20,
    padding: 10,
  },
  countItemContainer: {
    flexDirection: 'row',
    width: 70,
    justifyContent: 'space-between',
  },
  headContainerStyle: {
    width: 220,
    height: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  imageStyle: {
    width: 90,
    height: 70,
    borderRadius: 10,
  },
  headTextsStyle: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  iconContainer: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'gray',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
