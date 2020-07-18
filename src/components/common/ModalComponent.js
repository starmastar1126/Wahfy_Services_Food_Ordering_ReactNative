import React from 'react';
import {View, TouchableOpacity, Modal, StyleSheet} from 'react-native';
import {colors} from '../../constants';

export const ModalComponent = props => {
  const {modalStyle, modalBg} = modalStyles;
  const {visible, children, style, onClose} = props;
  return (
    <Modal
      style={modalStyle}
      transparent
      animationType="fade"
      visible={visible}
      presentationStyle="overFullScreen"
      onRequestClose={onClose}>
      <TouchableOpacity activeOpacity={1} style={modalBg} onPress={onClose} />
      <View style={[{zIndex: 2}, style]}>{children}</View>
    </Modal>
  );
};

const modalStyles = StyleSheet.create({
  modalStyle: {
    flex: 1,
    alignItems: 'center',
    alignSelf: 'center',
  },
  modalBg: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    zIndex: 1,
  },
});
