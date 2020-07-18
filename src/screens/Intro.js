import React, {Component} from 'react';
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  I18nManager,
} from 'react-native';
import {images} from '../assets';
import strings from '../strings';
import {colors} from '../constants';
import {Button} from '../components/common';
import {sWidth, sHeight, fScale, vScale, hScale} from 'step-scale';
import {connect} from 'react-redux';
import {languageSwitcher} from '../helpers/Language';
import AsyncStorage from '@react-native-community/async-storage';

const {isRTL} = I18nManager;

class Intro extends Component {
  async componentDidMount() {
    const langCode = await languageSwitcher.getCurrentLanguageCode();
    await languageSwitcher.switchTo(langCode);
    const token = await AsyncStorage.getItem('@TOKEN')
    if (token) {
      this.props.navigation.navigate('Home');
    }
  }

  render() {
    const {
      imageStyle,
      textsContainer,
      introTextStyle,
      setLocationText,
      buttonsContainer,
    } = styles;
    return (
      <ImageBackground source={images.food} style={imageStyle}>
        <View style={[textsContainer, isRTL && {alignItems: 'flex-start'}]}>
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
        {/* <Button
            title={strings.facebook}
            buttonStyle={{backgroundColor: '#4267B2'}}
          /> */}
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
});

const mapStateToProps = ({authReducer}) => {
  const {user} = authReducer;
  return {user};
};

export default connect(mapStateToProps, null)(Intro);
