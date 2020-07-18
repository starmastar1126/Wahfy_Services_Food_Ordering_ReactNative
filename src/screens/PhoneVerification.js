import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import strings from '../strings';
import { Input } from '../components/common';
import { colors } from '../constants';
import OTPInputView from '@twotalltotems/react-native-otp-input'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { base_URL } from '../services/API';
import AsyncStorage from '@react-native-community/async-storage';

export default class PhoneVerification extends Component {
  state = {
    code: '',
    error:'',
    errorCodeFromSign:''
  }
  codeClickfromSignUp=async()=>{
    const { code } = this.state
    const {navigation} = this.props
    if (code.length < 6) {
      this.setState({ error: strings.errorCode });
  }
  else{
    const data = {
      method: 'GET'
    };
    const userResult = await fetch(`${base_URL}auth/activate/${code}`, data);
    await userResult.json().then(async(res) => {
      console.log('signtwo', res);
      if(res.success==false){
        this.setState({errorCodeFromSign:'OTP code is invaild'})
      }
      else{
      await AsyncStorage.setItem('@TOKEN', JSON.stringify(res.data.token));
      await AsyncStorage.setItem('@USER', JSON.stringify(res));
      navigation.navigate('Home');
      }
  })
}
  }
  codeClick=()=>{
    const email = this.props.navigation.getParam('EmailForgetPasswordParam')
    const { code } = this.state
    const {navigation} = this.props
    if (code.length < 6) {
      this.setState({ error: strings.errorCode });
  }
  else{
    navigation.navigate({
      routeName: 'resetPass',
      params: {
        CodeParam: code,
        EmailForgetParam: email
      }
    })
  }
  }
  render() {
    const {
      container,
      verifyText,
      inputContainer,
      inputStyle,
      singleInputStyle,
    } = styles;
    const { code,error,errorCodeFromSign } = this.state
    const errorCode = this.props.navigation.getParam('ErrorParam')
    const emailSignup = this.props.navigation.getParam('EmailSignUpParam')

    return (
      <View style={container}>
        <Text style={verifyText}>{strings.phoneVerification}</Text>
        <Text style={{ marginTop: 10 }}>{strings.enterYourCode}</Text>
        {error?<Text style={{ marginTop: 10,fontSize: hp('2.5%'),color:'red',textAlign:'center' }}>{error}</Text>:null}
        {errorCode?<Text style={{ marginTop: 10,fontSize: hp('2.5%'),color:'red',textAlign:'center' }}>{errorCode}</Text>:null}
        {errorCodeFromSign?<Text style={{ marginTop: 10,fontSize: hp('2.5%'),color:'red',textAlign:'center' }}>{errorCodeFromSign}</Text>:null}
        <OTPInputView
          style={styles.OTPContainer}
          pinCount={6}
          code={code} //You can supply this prop or not. The component will be used as a controlled / uncontrolled component respectively.
          onCodeChanged={code => { this.setState({ code,error:'',errorCode:'',errorCodeFromSign:'' }) }}
          autoFocusOnLoad
          codeInputFieldStyle={styles.underlineStyleBase}
          codeInputHighlightStyle={styles.underlineStyleHighLighted}
          onCodeFilled={(code => {
            console.log(`Code is ${code}, you are good to go!`)
          })}
        />

        <View style={{ marginTop: 45 }}>
          {/* <Text style={{ fontSize: 15 }}>{strings.didntReceivedCode}</Text> */}
          {emailSignup?
          <TouchableOpacity
            style={{
              marginTop: 10,
              width: 170,
              height: 30,
              alignItems: 'center',
            }}onPress={this.codeClickfromSignUp}>
            <Text style={{ fontSize: 30, color: colors.buttonBG }}>
              {strings.gotohome}
            </Text>
          </TouchableOpacity>
          :<TouchableOpacity
            style={{
              marginTop: 10,
              width: 170,
              height: 30,
              alignItems: 'center',
            }}onPress={this.codeClick}>
            <Text style={{ fontSize: 30, color: colors.buttonBG }}>
              {strings.nextCode}
            </Text>
          </TouchableOpacity>}
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

  OTPContainer: {
    width: wp('100%'),
    height: hp('10%'),
    alignSelf:'center'
  },
  underlineStyleBase: {
    width: hp('8%'),
    height: hp('8%'),
    color: '#f1f2f6',
    margin:hp('1%'),
    backgroundColor: '#f1f2f6',
    borderRadius: hp('4%'),
    fontSize: hp('4%'),
    fontWeight: 'bold',
  },
  underlineStyleHighLighted: {
    backgroundColor: 'orange'
  },
});
{/* <View style={inputContainer}>
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
         */}