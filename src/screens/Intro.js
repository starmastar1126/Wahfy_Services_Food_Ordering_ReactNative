import React, { Component } from 'react';
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  I18nManager,
  ActivityIndicator,
  Alert,
  BackHandler
} from 'react-native';
import { images } from '../assets';
import strings from '../strings';
import { colors } from '../constants';
import { Button } from '../components/common';
import { sWidth, sHeight, fScale, vScale, hScale } from 'step-scale';
import { connect } from 'react-redux';
import { languageSwitcher } from '../helpers/Language';
import AsyncStorage from '@react-native-community/async-storage';
import { LoginManager, AccessToken } from 'react-native-fbsdk';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-community/google-signin';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { base_URL } from '../services/API';

const { isRTL } = I18nManager;

class Intro extends Component {
  state = {
    loading: true,
  }
  // componentWillMount() {
  //   BackHandler.addEventListener('hardwareBackPress', this.backPressed);
  // }

  // componentWillUnmount() {
  //   BackHandler.removeEventListener('hardwareBackPress', this.backPressed);
  // }

  // backPressed = () => {
  //   Alert.alert(
  //     strings.exitApp,
  //     strings.exit,
  //     [
  //       { text: strings.no, onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
  //       { text: strings.yes, onPress: () => BackHandler.exitApp() },
  //     ],
  //     { cancelable: true });
  //   return true;
  // }
  async componentDidMount() {
    const langCode = await languageSwitcher.getCurrentLanguageCode();
    await languageSwitcher.switchTo(langCode);
    const token = await AsyncStorage.getItem('@TOKEN')
    if (token) {
      this.setState({ loading: false })
      this.props.navigation.navigate('Home');
    }
    else {
      this.setState({ loading: false })
    }

    //Login with Google
    GoogleSignin.configure({
      scopes: ['https://www.googleapis.com/auth/drive.readonly'], // what API you want to access on behalf of the user, default is email and profile
      webClientId: '847338080093-6qjdfdl3ooqbmg84qk7ed6el3b99dbrs.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
      offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
      //hostedDomain: '', // specifies a hosted domain restriction
      //loginHint: '', // [iOS] The user's ID, or email address, to be prefilled in the authentication UI if possible. [See docs here](https://developers.google.com/identity/sign-in/ios/api/interface_g_i_d_sign_in.html#a0a68c7504c31ab0b728432565f6e33fd)
      forceConsentPrompt: true, // [Android] if you want to show the authorization prompt at each login.
      //accountName: '', // [Android] specifies an account name on the device that should be used
      //iosClientId: '<FROM DEVELOPER CONSOLE>', // [iOS] optional, if you want to specify the client ID of type iOS (otherwise, it is taken from GoogleService-Info.plist)
    });
  }
  buttonFacebook = () => {
    LoginManager.logInWithPermissions(["public_profile"]).then(
      async function (result) {
        if (result.isCancelled) {
          console.log("Login cancelled");
        } else {
          // AccessToken.getCurrentAccessToken().then(
          //   async (data) => {
          //     console.log(data.accessToken.toString())
          //     await AsyncStorage.setItem('@TOKEN', data.accessToken.toString())
          //     this.props.navigation.navigate('Home');
          //   }
          // )
          console.log(
            "Login success with permissions: " +
            result.grantedPermissions.toString()
          )
        }
      }
    );
  }
  postlogingoogle = async (email, familyName, givenName,
    id, name, photo) => {
      const {navigation} = this.props
    const user = {
      email, familyName, givenName,
      id, name, photo
    }
    const data = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
    },
      body: JSON.stringify({
        user: user
      })
    };
    const userResult = await fetch(`${base_URL}auth/login/google`, data);
    await userResult.json().then(async (res) => {
      console.log('goooglelogin', res);
      await AsyncStorage.setItem('@TOKEN', JSON.stringify(res.data.token));
      await AsyncStorage.setItem('@USER', JSON.stringify(res));
      navigation.navigate('Home');
    })
  }
  buttonGoogle = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      console.log('userInfo', userInfo);
      this.postlogingoogle(
        userInfo.user.email,
        userInfo.user.familyName,
        userInfo.user.givenName,
        userInfo.user.id,
        userInfo.user.name,
        userInfo.user.photo
      )
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
      } else {
        // some other error happened
      }
    }
  }
  render() {
    const { loading } = this.state
    const {
      imageStyle,
      textsContainer,
      introTextStyle,
      setLocationText,
      buttonsContainer,
      buttonFacebook,
      buttonGoogle,
      ActivityIndicato
    } = styles;
    if (loading) {
      return (
        <ActivityIndicator size='large'
          style={ActivityIndicato} color={colors.buttonBG} />
      )
    }
    return (
      <ImageBackground source={images.food} style={imageStyle}>
        <View style={[textsContainer, isRTL && { alignItems: 'flex-start' }]}>
          <Text style={introTextStyle}>{strings.delivered}</Text>
          <Text style={introTextStyle}>{strings.fastFood}</Text>
          <Text style={introTextStyle}>{strings.toYour}</Text>
          <Text style={introTextStyle}>{strings.door}</Text>
          <Text style={[introTextStyle, setLocationText]}>
            {strings.setLocation}
          </Text>
          <Text style={[introTextStyle, setLocationText]}>
            {strings.resturant}
          </Text>
        </View>
        {/* <View style={buttonsContainer}> */}
        <Button
          title={strings.login}
          buttonStyle={buttonsContainer}
          onPress={() => this.props.navigation.navigate('Login')}
        />
        <Button
          title={strings.facebook}
          buttonStyle={buttonFacebook}
          onPress={this.buttonFacebook}
        />
        <Button
          title={strings.google}
          buttonStyle={buttonGoogle}
          onPress={this.buttonGoogle}
        />
        {/* </View> */}
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  imageStyle: {
    width: sWidth,
    height: sHeight,
  },
  textsContainer: {
    marginTop: vScale(50),
    marginStart: hScale(30),
  },
  introTextStyle: {
    fontSize: fScale(40),
    fontWeight: '700',
    color: colors.white,
  },
  setLocationText: {
    fontSize: fScale(15),
    marginTop: vScale(5),
  },
  buttonsContainer: {
    position: 'absolute',
    zIndex: 1,
    bottom: '30%',
  },
  buttonFacebook: {
    position: 'absolute',
    zIndex: 1,
    bottom: '20%',
    backgroundColor: '#4267B2',
    width: '40%',
    right: '5%'
  },
  buttonGoogle: {
    position: 'absolute',
    zIndex: 1,
    bottom: '20%',
    backgroundColor: '#ea4335',
    width: '40%',
    left: '5%'
  },
  ActivityIndicato: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1
  }
});

const mapStateToProps = ({ authReducer }) => {
  const { user } = authReducer;
  return { user };
};

export default connect(mapStateToProps, null)(Intro);
