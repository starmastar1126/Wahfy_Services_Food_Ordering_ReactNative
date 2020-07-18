import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Modal,
  Alert,
  TextInput
} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

import { Input, Button } from '../components/common';
//import Modal, {ModalContent} from 'react-native-modals';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { login } from '../redux/actions';
import { images } from '../assets';
import { colors } from '../constants';
import strings from '../strings';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { isEmail } from '../constants/validator';
import { base_URL } from '../services/API';

class Login extends Component {
  state = {
    email: '',
    email2: '',
    password: '',
    error: '',
    error2: '',
    modalVisible: false,
  };
  forgetPasswordClick = async () => {
    const { email2 } = this.state
    const { navigation } = this.props
    const validation = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!validation.test(email2)) {
      this.setState({ error2: 'The email address is badly formatted.' });
    }
    else {
      const data = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email2
        })
      };
      const userResult = await fetch(`${base_URL}auth/password/create`, data);
      await userResult.json().then(res => {
        console.log(res);
        if (res.message == strings.errorMailmodal) {
          this.setState({ error2: res.message })
        }
        else if(res.message=="We have e-mailed your password reset link!"){
          Alert.alert(strings.alertsend)
          navigation.navigate({
            routeName: 'PhoneV',
            params: {
              EmailForgetPasswordParam: email2
            }
          })
          this.setState({ modalVisible: false });
        }
      });
    }
  }
  validateLoginInputs({ emailError, passwordError }) {
    if (emailError) {
      this.setState({ error: 'email' });
    } else if (passwordError) {
      this.setState({ error: 'password' });
    } else this.login();
  }

  login() {
    const { email, password } = this.state;
    const { navigation } = this.props;
    this.props.login({ email, password, navigation });
  }

  render() {
    const {
      imageStyle,
      inputsCard,
      inputsContainer,
      welcomeBackText,
      loginToAccountText,
      buttonStyle,
      modalButtonsContainer,
      forgetBtn,
    } = styles;
    const { email, email2, password, error, error2, modalVisible } = this.state;
    const { navigation, loading } = this.props;

    const emailError = email.length == 0 || !isEmail(email);
    const isEmailError = error === 'email';

    const passwordError = password.length == 0 || password.length < 6;
    const isPasswordError = error === 'password';

    const {
      emailErrorText,
      passwordErrorText,
      forgetEmailErrorText,
    } = strings.errorMessages;

    return (
      <ScrollView style={{ flex: 1 }}>
        {/* modal section */}
        <Modal transparent
          animationType="slide"
          visible={modalVisible}
          onRequestClose={() => {
            this.setState({ modalVisible: false });
          }}>
          <View style={modalButtonsContainer}>
            <Text style={styles.modaltext}>{strings.forgetPassword}</Text>
            {error2 ? <Text style={styles.error}>{error2}</Text> : null}
            <TextInput
            style={[styles.input,{borderWidth:error2?1:0,borderColor:error2?'red':null}]}
            placeholder={strings.email}
            placeholderTextColor={colors.placeholder}
            value={email2}
            onChangeText={(email2) => { this.setState({ email2, error2: '' }) }}/>
            {/* <Input
              placeholder={strings.email}
              placeholderTextColor={colors.placeholder}
              value={email2}
              onChangeText={(email2) => { this.setState({ email2, error2: '' }) }}
              errorMessage={error2}
            /> */}
            <Button title={strings.send}
              buttonStyle={forgetBtn}
              onPress={this.forgetPasswordClick} />
          </View>
        </Modal>
        <KeyboardAwareScrollView
          contentContainerStyle={inputsContainer}
          behavior="padding">
          <Image source={images.food} style={imageStyle} />
          <View style={inputsCard}>
            <View style={{ alignItems: 'center' }}>
              <Text style={welcomeBackText}>{strings.welcomeBack}</Text>
              <Text style={loginToAccountText}>{strings.loginToAccount}</Text>
            </View>
            <View style={{ marginTop: 30 }}>
              <Input
                placeholder={strings.email}
                placeholderTextColor={colors.placeholder}
                inputStyle={{ fontSize: 18 }}
                value={email}
                onChangeText={email => this.setState({ email, error: '' })}
                errorMessage={isEmailError && emailErrorText}
              />
              <Input
                placeholder={strings.password}
                placeholderTextColor={colors.placeholder}
                inputStyle={{ fontSize: 18 }}
                value={password}
                secureTextEntry
                onChangeText={password => this.setState({ password, error: '' })}
                errorMessage={isPasswordError && passwordErrorText}
              />
            </View>
            <Button
              loading={loading}
              title={strings.login}
              buttonStyle={buttonStyle}
              onPress={() =>
                this.validateLoginInputs({
                  emailError,
                  passwordError,
                })
              }
            />
            <TouchableOpacity
              style={{ marginTop: 30 }}
              onPress={() => this.setState({ modalVisible: !modalVisible })}>
              <Text style={{ textAlign: 'center' }}>
                {strings.forgetPassword}
              </Text>
            </TouchableOpacity>

            <View
              style={{
                width: '100%',
                justifyContent: 'center',
                marginTop: 30,
                flexDirection: 'row',
              }}>
              <Text>{strings.dontHaveAccount}</Text>
              <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
                <Text style={{ color: colors.buttonBG }}>{strings.signup}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAwareScrollView>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  imageStyle: {
    width: '100%',
    height: 250,
    resizeMode: 'cover',
  },
  inputsCard: {
    width: '100%',
    backgroundColor: colors.white,
    marginTop: -10,
    borderTopRightRadius: 15,
    borderTopLeftRadius: 15,
    paddingBottom: 20,
  },
  inputContainer: {
    width: 300,
    alignItems: 'center',
    justifyContent: 'center',
  },
  welcomeBackText: {
    color: colors.black,
    fontSize: 25,
    marginTop: 50,
    fontWeight: '600',
  },
  loginToAccountText: {
    color: colors.black,
    fontSize: 14,
    marginTop: 15,
  },
  buttonStyle: {
    width: '85%',
    height: 45,
    marginTop: 40,
  },
  modalButtonsContainer: {
    width: wp('80%'),
    margin: hp('30%'),
    paddingTop: hp('11%'),
    paddingBottom: hp('11%'),
    padding: hp('1%'),
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    backgroundColor: '#f5f6fa',
    borderRadius: 5
  },
  forgetBtn: {
    width: '90%',
  },
  modaltext: {
    fontSize: hp('2%'),
    padding: hp('1%')
  },
  input:{backgroundColor:'#dcdde1',
    textAlign: 'left',
    fontSize: hp('2%'),
    alignSelf: 'stretch',
    margin: wp('5%'),
    padding: wp('2%'),
    borderRadius:hp('2%'),
    height:hp('6%'),
    color: colors.main
  },
  error: {
    color: 'red',
    fontSize: hp('2%'),
    textAlign: 'center',
    padding: hp('0.5%')
},
});

const mapStateToProps = ({ authReducer }) => {
  const { loading } = authReducer;
  return { loading };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      login,
    },
    dispatch,
  );
};
export default connect(mapStateToProps, mapDispatchToProps)(Login);
