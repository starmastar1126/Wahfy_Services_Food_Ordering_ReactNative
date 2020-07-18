import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import strings from '../strings';
import {Input} from '../components/common';
import {colors} from '../constants';
import {TouchableOpacity} from 'react-native-gesture-handler';

export class PhoneVerification extends Component {
  render() {
    const {
      container,
      verifyText,
      inputContainer,
      inputStyle,
      singleInputStyle,
    } = styles;
    return (
      <View style={container}>
        <Text style={verifyText}>{strings.phoneVerification}</Text>
        <Text style={{marginTop: 10}}>{strings.enterYourCode}</Text>
        <View style={inputContainer}>
          <Input
            containerStyle={inputStyle}
            keyboardType="phone-pad"
            inputStyle={singleInputStyle}
            returnKeyType="go"
          />
          <Input
            containerStyle={inputStyle}
            keyboardType="phone-pad"
            inputStyle={singleInputStyle}
          />
          <Input
            containerStyle={inputStyle}
            keyboardType="phone-pad"
            inputStyle={singleInputStyle}
          />
          <Input
            containerStyle={inputStyle}
            keyboardType="phone-pad"
            inputStyle={singleInputStyle}
          />
        </View>
        <View style={{marginTop: 45}}>
          <Text style={{fontSize: 15}}>{strings.didntReceivedCode}</Text>
          <TouchableOpacity
            style={{
              marginTop: 10,
              width: 170,
              height: 30,
              alignItems: 'center',
            }}>
            <Text style={{fontSize: 15, color: colors.buttonBG}}>
              {strings.resendCode}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  verifyText: {
    fontSize: 35,
    fontWeight: 'bold',
    marginTop: 100,
    textAlign: 'center',
  },
  inputContainer: {
    width: '100%',
    flexDirection: 'row',
    marginTop: 50,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
  },
  inputStyle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#e1e1e1',
    alignItems: 'center',
    justifyContent: 'center',
  },
  singleInputStyle: {
    fontSize: 30,
    width: 1,
    height: 25,
    marginStart: 0,
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
});
