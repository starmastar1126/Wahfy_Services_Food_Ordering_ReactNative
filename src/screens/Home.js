import React, { Component } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { images } from '../assets';
import strings from '../strings';
import { Button } from '../components/common';
import { colors } from '../constants';
import Modal, { ModalContent } from 'react-native-modals';
import Geolocation from '@react-native-community/geolocation';
import Geocoder from 'react-native-geocoder';
import AsyncStorage from '@react-native-community/async-storage';

class Home extends Component {
  state = {
    modalVisible: false,
    latitude: '37.78825',
    longitude: '-122.4324',
    type: 'ss',
  };


  getAddress() {
    Geolocation.getCurrentPosition(async position => {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      this.setState({ latitude, longitude });

      const response = await fetch(
        'https://maps.googleapis.com/maps/api/geocode/json?address=' +
        this.state.latitude +
        ',' +
        this.state.longitude +
        '&key=' +
        'AIzaSyBb0Rk4lIS1MXvMtqoOEhTnj0dFoQEuXO0',
      );
      // console.log(response);
      const result = await response.json();
      // console.log(result);

      //   Geocoder.geocodePosition(
      //     position.coords.latitude,
      //     position.coords.longitude,
      //   )
      //     .then(res => {
      //       console.log('positionRES', res);
      //     })
      //     .catch(err => console.log(err));
    });
  }

  render() {
    const { modalVisible, type } = this.state;
    const {
      imageStyle,
      deliveryButton,
      takeAwayButton,
      modalButtonsContainer,
      useAddressBtn,
      editBtn,
    } = styles;
    const { navigation } = this.props;
    return (
      <View style={{ flex: 1, alignItems: 'center' }}>
        {/* modal section */}
        <Modal
          visible={modalVisible}
          onTouchOutside={() => {
            this.setState({ modalVisible: false });
          }}>
          <ModalContent style={modalButtonsContainer}>
            <Button
              title={strings.useThisAddress}
              buttonStyle={useAddressBtn}
              onPress={() => {
                this.setState({ modalVisible: false });
                this.getAddress();
              }}
            />
            <Button
              title={strings.edit}
              buttonStyle={editBtn}
              onPress={() => {
                this.setState({ modalVisible: false });
                navigation.navigate('MyAddresses');
              }}
            />
          </ModalContent>
        </Modal>

        <Image source={images.food_1} style={imageStyle} />
        <View style={{ marginTop: 50, alignItems: 'center' }}>
          <Button
            title={strings.delivery}
            buttonStyle={deliveryButton}
            onPress={() => this.setState({ modalVisible: !modalVisible })}
          />
          <Text style={{ fontSize: 20 }}>{strings.or}</Text>
          <Button
            title={strings.takeAway}
            buttonStyle={takeAwayButton}
            onPress={() =>
              navigation.navigate('Branches', {
                serviceType: 'takeaway',
                test: null,
              })
            }
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  imageStyle: {
    width: '100%',
    height: '50%',
  },
  deliveryButton: {
    width: '85%',
    height: 50,
    borderRadius: 12,
    backgroundColor: colors.deliveryButtonBG,
    marginBottom: 15,
  },
  takeAwayButton: {
    width: '85%',
    height: 50,
    borderRadius: 12,
    backgroundColor: colors.takeAwayButtonBG,
    marginTop: 15,
  },
  modalButtonsContainer: {
    width: 320,
    height: 250,
    alignItems: 'center',
    justifyContent: 'center',
  },
  useAddressBtn: {
    width: '80%',
    backgroundColor: 'blue',
  },
  editBtn: {
    width: '80%',
    backgroundColor: 'green',
    marginTop: 15,
  },
});

export default Home;
