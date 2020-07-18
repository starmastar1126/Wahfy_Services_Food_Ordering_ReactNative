import React, {Component} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {Input, Button} from '../components/common';
import Modal, {ModalContent} from 'react-native-modals';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {login} from '../redux/actions';
import {images} from '../assets';
import {colors} from '../constants';
import strings from '../strings';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {isEmail} from '../constants/validator';

class Login extends Component {
  state = {
    email: '',
    password: '',
    error: '',
    modalVisible: false,
  };

  validateLoginInputs({emailError, passwordError}) {
    if (emailError) {
      this.setState({error: 'email'});
    } else if (passwordError) {
      this.setState({error: 'password'});
    } else this.login();
  }

  login() {
    const {email, password} = this.state;
    const {navigation} = this.props;
    this.props.login({email, password, navigation});
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
    const {email, password, error, modalVisible} = this.state;
    const {navigation, loading} = this.props;

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
      <ScrollView style={{flex: 1}}>
        {/* modal section */}
        <Modal
          visible={modalVisible}
          onTouchOutside={() => {
            this.setState({modalVisible: false});
          }}>
          <ModalContent style={modalButtonsContainer}>
            <Text>{strings.forgetPassword}</Text>
            <Input
              placeholder={strings.email}
              placeholderTextColor={colors.placeholder}
              value={email}
              onChangeText={email => this.onEmailChanged(email)}
              errorMessage={isEmailError && forgetEmailErrorText}
            />
            <Button title={strings.edit} buttonStyle={forgetBtn} />
          </ModalContent>
        </Modal>
        <KeyboardAwareScrollView
          contentContainerStyle={inputsContainer}
          behavior="padding">
          <Image source={images.food} style={imageStyle} />
          <View style={inputsCard}>
            <View style={{alignItems: 'center'}}>
              <Text style={welcomeBackText}>{strings.welcomeBack}</Text>
              <Text style={loginToAccountText}>{strings.loginToAccount}</Text>
            </View>
            <View style={{marginTop: 30}}>
              <Input
                placeholder={strings.email}
                placeholderTextColor={colors.placeholder}
                inputStyle={{fontSize: 18}}
                value={email}
                onChangeText={email => this.setState({email, error: ''})}
                errorMessage={isEmailError && emailErrorText}
              />
              <Input
                placeholder={strings.password}
                placeholderTextColor={colors.placeholder}
                inputStyle={{fontSize: 18}}
                value={password}
                secureTextEntry
                onChangeText={password => this.setState({password, error: ''})}
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
              style={{marginTop: 30}}
              onPress={() => this.setState({modalVisible: !modalVisible})}>
              <Text style={{textAlign: 'center'}}>
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
                <Text style={{color: colors.buttonBG}}>{strings.signup}</Text>
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
    width: 370,
    height: 250,
    alignItems: 'center',
    justifyContent: 'center',
  },
  forgetBtn: {
    width: '90%',
  },
});

const mapStateToProps = ({authReducer}) => {
  const {loading} = authReducer;
  return {loading};
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
