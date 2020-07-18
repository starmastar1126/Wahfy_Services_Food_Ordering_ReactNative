import { Platform } from "react-native";

export const isEmail = email => {
  return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
};
export const isPhoneNumber = phone =>
  !isNaN(phone) && phone.startsWith("0") && phone.length == 10;

export const isAndroid = Platform.OS == "android";
