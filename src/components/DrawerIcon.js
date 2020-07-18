import React from "react";
import { TouchableOpacity, Image, StyleSheet, I18nManager } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome'
import { colors } from "../constants";

const { isRTL } = I18nManager;

export const DrawerIcon = props => {
  const { iconContainer, iconStyle } = styles;
  const { navigation } = props;
  return (
    <TouchableOpacity
      onPress={() => navigation.openDrawer()}
      style={iconContainer}
    >
      <Icon
        name="align-justify"
        color={colors.white}
        size={16}
        style={iconStyle}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  iconContainer: {
    width: 33,
    height: 24,
    paddingHorizontal: 30,
    alignItems: "center",
    justifyContent: "center"
  },
  iconStyle: {
    width: 23,
    height: 18,
  }
});
