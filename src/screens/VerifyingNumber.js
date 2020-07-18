import React, {Component} from 'react';
import {View, Text, StyleSheet, TextInput} from 'react-native';
import strings from '../strings';
import {colors} from '../constants';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Input, Button} from '../components/common';
import {TouchableOpacity} from 'react-native-gesture-handler';

export class VerifyingNumber extends Component {
  state = {
    phone: '',
  };

  render() {
    const {
      container,
      verifyText,
      weHaveSentSMSText,
      orLoginText,
      buttonStyle,
    } = styles;

    const {phone} = this.state;
    return (
      <View style={container}>
        <Text style={verifyText}>{strings.verifyingNumber}</Text>
        <Text style={weHaveSentSMSText}>
          {strings.weHaveSentSMS} {phone}
        </Text>
        <Input
          placeholder={strings.phone}
          value={phone}
          onChangeText={phone => this.setState({phone})}
          keyboardType="phone-pad"
          icon="close"
          containerStyle={{marginTop: 50}}
          onRightPress={() => this.setState({phone: ''})}
        />
        <View style={{flexDirection: 'row', marginTop: 30}}>
          <Text style={orLoginText}>{strings.orLogin} </Text>
          <TouchableOpacity>
            <Text style={[orLoginText, {color: colors.buttonBG}]}>
              {strings.socialNetwork}
            </Text>
          </TouchableOpacity>
        </View>
        <Button
          title={strings.next}
          buttonStyle={buttonStyle}
          onPress={() => this.props.navigation.navigate('phoneVerification')}
        />
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
    width: '60%',
    fontSize: 35,
    fontWeight: 'bold',
    marginTop: 100,
    textAlign: 'center',
  },
  weHaveSentSMSText: {
    width: '80%',
    fontSize: 15,
    marginTop: 20,
    textAlign: 'center',
  },
  inputStyle: {
    marginTop: 20,
    width: '85%',
    height: 48,
    borderRadius: 20,
    backgroundColor: colors.inputBG,
    paddingHorizontal: 19,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    borderWidth: 0.5,
    borderColor: 'gray',
  },
  orLoginText: {
    fontSize: 14,
    color: colors.black,
  },
  buttonStyle: {
    marginTop: 80,
    borderRadius: 0,
    width: '100%',
  },
});
