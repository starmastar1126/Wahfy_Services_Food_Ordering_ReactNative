import React, {Component} from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import {Input, Button} from '../components';
import {hScale, sWidth, vScale} from 'step-scale';
import {colors} from '../constants';
import strings from '../strings';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

class Profile extends Component {
  render() {
    const {
      container,
      labelInputContainer,
      inputStyle,
      labelStyle,
      buttonStyle,
    } = styles;
    return (
      <ScrollView contentContainerStyle={container}>
        <KeyboardAwareScrollView behavior="padding">
          <View style={labelInputContainer}>
            <Text style={labelStyle}>{strings.fullName}</Text>
            <Input containerStyle={inputStyle} />
          </View>
          <View style={labelInputContainer}>
            <Text style={labelStyle}>{strings.email}</Text>
            <Input containerStyle={inputStyle} />
          </View>
          <View style={labelInputContainer}>
            <Text style={labelStyle}>{strings.phone}</Text>
            <Input containerStyle={inputStyle} />
          </View>
          <View style={labelInputContainer}>
            <Text style={labelStyle}>{strings.date}</Text>
            <Input containerStyle={inputStyle} />
          </View>

          <Button title={strings.save} buttonStyle={buttonStyle} />
        </KeyboardAwareScrollView>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    marginTop: 50,
  },
  labelInputContainer: {
    flexDirection: 'row',
    width: hScale(355),
    paddingHorizontal: hScale(10),
    alignItems: 'center',
    justifyContent: 'space-between',
    // marginVertical: vScale(20),
  },
  labelStyle: {
    fontSize: 18,
    color: 'gray',
  },
  inputStyle: {
    width: hScale(200),
    borderBottomWidth: hScale(1),
    color: colors.black,
    borderBottomColor: 'gray',
    borderRadius: 0,
    borderWidth: 0,
    backgroundColor: 'transparent',
  },
  buttonStyle: {
    width: '70%',
    borderRadius: hScale(10),
    marginTop: vScale(50),
  },
});

export default Profile;
