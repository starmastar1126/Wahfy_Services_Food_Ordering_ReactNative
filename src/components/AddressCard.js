import React from 'react';
import {TouchableOpacity, View, Text, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {colors} from '../constants';

export const AddressCard = props => {
  const {item, isSelected, onPress, onPressDelete} = props;
  const {id, name, street, building_number, floor_number, landmark} = item;

  const {
    container,
    headContainer,
    selectionContainer,
    selectedView,
    iconContainer,
    addressContainer,
  } = styles;
  return (
    <TouchableOpacity
      key={id}
      style={[container, isSelected && {borderColor: colors.buttonBG}]}
      onPress={onPress}>
      <View style={headContainer}>
        <View
          style={[
            selectionContainer,
            isSelected && {borderColor: colors.buttonBG},
          ]}>
          {isSelected && <View style={selectedView} />}
        </View>
        <Text>{name}</Text>
        <TouchableOpacity style={iconContainer} onPress={onPressDelete}>
          <Icon name="trash" size={18} />
        </TouchableOpacity>
      </View>
      <View style={addressContainer}>
        <Text numberOfLines={2} style={{lineHeight: 23}}>
          {street}, BuildNO: {building_number}, FloorNO: {floor_number},
          Landmark: {landmark}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '90%',
    height: 130,
    borderWidth: 0.5,
    borderColor: '#b8b3b3',
    alignSelf: 'center',
    marginTop: 10,
    paddingVertical: 15,
  },
  headContainer: {
    flexDirection: 'row',
    marginStart: 15,
    alignItems: 'center',
  },
  selectionContainer: {
    width: 25,
    height: 25,
    borderRadius: 12.5,
    borderWidth: 1,
    borderColor: '#b8b3b3',
    alignItems: 'center',
    justifyContent: 'center',
    marginEnd: 10,
  },
  selectedView: {
    width: 15,
    height: 15,
    borderRadius: 7.5,
    backgroundColor: colors.buttonBG,
  },
  iconContainer: {
    width: 22,
    height: 22,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    zIndex: 1,
    end: 15,
  },
  addressContainer: {
    width: '90%',
    height: 80,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonStyle: {
    width: '90%',
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: 'gray',
    borderWidth: 0.5,
    alignSelf: 'center',
    marginTop: 15,
  },
});
