import React from 'react';
import {
  TextInput,
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  Text,
  ActivityIndicator,
  I18nManager,
} from 'react-native';
import {colors} from '../../constants';
import Icon from 'react-native-vector-icons/FontAwesome';

const {isRTL} = I18nManager;

export const Input = props => {
  const {
    errorMessage,
    inputStyle,
    containerStyle,
    icon,
    onLeftPress,
    leftIconButton,
    errorMessageCustom,

    buttonLoading,
    leftIconStyle,
    loadingColor,
    buttonContainer,
    iconCustomStyle,
    onRightPress,
  } = props;
  const {
    container,
    input,
    errorContainer,
    errorMessageStyle,
    buttonStyle,
    iconStyle,
  } = styles;
  const hasIcon = typeof icon !== 'undefined';
  return (
    <View>
      <View
        style={[
          container,
          containerStyle,
          errorMessage && {borderColor: 'red'},
        ]}>
        {leftIconButton && (
          <TouchableOpacity
            onPress={onLeftPress}
            style={[buttonStyle, buttonContainer]}
            disabled={buttonLoading}>
            {buttonLoading ? (
              <ActivityIndicator
                size="small"
                color={loadingColor || colors.white}
              />
            ) : (
              <Icon name={icon} style={leftIconStyle} />
            )}
          </TouchableOpacity>
        )}
        <TextInput
          style={[input, isRTL && {textAlign: 'right'}, inputStyle]}
          placeholderTextColor={colors.brownGrey}
          {...props}
        />
        {/* {rightIconButton && (
          <TouchableOpacity
            onPress={onRightPress}
            style={[buttonStyle, buttonContainer]}
            disabled={buttonLoading}>
            {buttonLoading ? (
              <ActivityIndicator
                size="small"
                color={loadingColor || colors.white}
              />
            ) : (
              <Image source={rightIconButton} style={rightIconStyle} />
            )}
          </TouchableOpacity>
        )} */}
        <TouchableOpacity onPress={onRightPress}>
          {hasIcon && (
            <Icon name={icon} size={16} style={[iconStyle, iconCustomStyle]} />
          )}
        </TouchableOpacity>
      </View>
      <View style={[errorContainer]}>
        <Text style={[errorMessageStyle, errorMessageCustom]}>
          {errorMessage ? errorMessage : ''}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    elevation: 4,
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
  input: {
    flex: 1,
    textAlign: 'left',
    fontSize: 12,
    alignSelf: 'stretch',
    marginLeft: 19,
    color: colors.main,
  },
  imageStyle: {
    marginLeft: 17,
    resizeMode: 'contain',
  },
  errorMessageStyle: {
    textAlign: 'center',
    fontSize: 12,
    color: 'red',
  },
  errorContainer: {
    height: 18,
    marginTop: 5,
  },
  buttonStyle: {
    width: 56,
    height: 32,
  },
});
