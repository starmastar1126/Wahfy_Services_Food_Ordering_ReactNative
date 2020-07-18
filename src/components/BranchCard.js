import React from 'react';
import {TouchableOpacity, View, Text, StyleSheet} from 'react-native';
import {colors} from '../constants';
import strings from '../strings';
import {hScale, vScale} from 'step-scale';
import moment from 'moment';

export const BranchCard = props => {
  const {item, isSelected, onPress} = props;

  const {id, name_en, address_description, city, working_hours} = item;

  const {time_from, time_to} = working_hours || '';

  const haveWorkingHours = working_hours != null;

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
        <Text style={{color: '#31B990'}}>{name_en}</Text>
      </View>
      <View style={addressContainer}>
        <Text numberOfLines={2} style={{color: '#31B990'}}>
          {address_description} {city.name_en}
        </Text>
      </View>

      {haveWorkingHours && (
        <View
          style={{
            flexDirection: 'row',
            width: '90%',
            alignItems: 'center',
            alignSelf: 'center',
            justifyContent: 'space-between',
          }}>
          <Text style={{color: '#31B990'}}>{strings.workingHours}</Text>
          <Text style={{color: 'green'}}>
            {strings.from} {time_from}
          </Text>
          <Text style={{color: 'red'}}>
            {strings.to} {time_to}
          </Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '90%',
    height: vScale(130),
    borderWidth: 0.5,
    borderColor: '#b8b3b3',
    alignSelf: 'center',
    marginTop: vScale(10),
    paddingVertical: hScale(15),
  },
  headContainer: {
    flexDirection: 'row',
    marginStart: hScale(15),
    alignItems: 'center',
  },
  selectionContainer: {
    width: hScale(25),
    height: hScale(25),
    borderRadius: hScale(12.5),
    borderWidth: 1,
    borderColor: '#b8b3b3',
    alignItems: 'center',
    justifyContent: 'center',
    marginEnd: hScale(10),
  },
  selectedView: {
    width: hScale(15),
    height: hScale(15),
    borderRadius: hScale(7.5),
    backgroundColor: colors.buttonBG,
  },
  iconContainer: {
    width: hScale(22),
    height: hScale(22),
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    zIndex: 1,
    end: hScale(15),
  },
  addressContainer: {
    width: '90%',
    height: vScale(60),
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: hScale(20),
  },
  buttonStyle: {
    width: '90%',
    height: vScale(40),
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: 'gray',
    borderWidth: 0.5,
    alignSelf: 'center',
    marginTop: vScale(15),
  },
});
