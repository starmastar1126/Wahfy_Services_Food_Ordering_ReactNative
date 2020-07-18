import React from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  View,
  Text,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'

export const Button = props => {
  const {
    buttonStyle,
    title,
    titleStyle,
    onPress,
    loading,
    icon,
    iconStyle,
    disabled,
  } = props;
  const {
    textStyle,
    containerStyle,
    innerContainer,
  } = styles;
  const hasIcon = typeof icon !== 'undefined';
  const hasTitle = typeof title !== 'undefined';
  return (
    <TouchableOpacity
      disabled={disabled}
      onPress={onPress}
      style={[containerStyle, buttonStyle]}>

      {loading ? (
        <ActivityIndicator size="small" color={'white'} />
      ) : (
        <View style={[innerContainer]}>
          {hasTitle && (
            <Text
              style={[
                textStyle,
                titleStyle
              ]}>
              {title}
            </Text>
          )}
          {hasIcon && (
            <Icon resizeMode="center" source={icon} style={iconStyle} />
          )}
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  textStyle: {
    fontSize: 18,
    flex: 1,
    textAlign: 'center',
    fontWeight: '500',
    color: 'white'
  },
  containerStyle: {
    width: "90%",
    height: 55,
    borderRadius: 5,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'orange'
  },
  innerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  }
});
