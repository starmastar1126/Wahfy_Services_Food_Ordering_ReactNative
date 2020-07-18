import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, Modal, Dimensions, PermissionsAndroid, Alert } from 'react-native';
import { images } from '../assets';
import strings from '../strings';
import { Button } from '../components/common';
import { colors } from '../constants';
import Geolocation from '@react-native-community/geolocation';
//import Geocoder from 'react-native-geocoder';
import AsyncStorage from '@react-native-community/async-storage';
import MapView from 'react-native-maps';

class Home extends Component {
  state = {
    modalVisible: false,
    latitude: 0,
    longitude: 0,
    type: 'ss',
  };


  requestLocationPermission = async () => {
    const checkLocation = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
    );

    if (checkLocation === PermissionsAndroid.RESULTS.GRANTED) {


      this.getAddress();
    } else {
      try {

        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Cool Photo App Camera Permission',
            message:
              'Cool Photo App needs access to your camera ' +
              'so you can take awesome pictures.',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          this.getAddress();
        } else {
          console.log('Camera permission denied');
        }
      } catch (err) {
        console.warn(err);
      }
    }

  }

  componentDidMount = () => {
    this.requestLocationPermission();
  }

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
        'AIzaSyCrE37VwfRoP6qvTzPcmsDfCyVyhDbKf9s',
      );
      // console.log(response);
      const result = await response.json();
      console.log(result);

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

  useMyLocationButtonPressed = () => {
    this.setState({ modalVisible: false });
    this.getAddress();
  }

  editButtonPressed = () => {
    const { navigation } = this.props;

    this.setState({ modalVisible: false });
    navigation.navigate('MyAddresses');
  }

  render() {
    const { modalVisible, type } = this.state;
    const {
      imageStyle,
      deliveryButton,
      takeAwayButton,
      mapView,
      modalButtonsContainer,
      useAddressBtn,
      editBtn,
      contanierView,
      contentView
    } = styles;
    const { latitude, longitude } = this.state;
    const { navigation } = this.props;
    return (
      <View style={{ flex: 1, alignItems: 'center' }}>
        <Modal visible={modalVisible} transparent
        onRequestClose={()=>console.log('close')}>
          <View style={contanierView}>
            {(latitude) ? <MapView style={mapView} initialRegion={{
              latitude,
              longitude,
              latitudeDelta: 0.3,
              longitudeDelta: 0.3,
            }} /> : <View />}

            <View style={modalButtonsContainer}>
              <Button
                title={strings.useThisAddress}
                buttonStyle={useAddressBtn}
                onPress={this.useMyLocationButtonPressed}
              />
              <Button
                title={strings.edit}
                buttonStyle={editBtn}
                onPress={this.editButtonPressed}
              />
            </View>
          </View>
        </Modal>
        {/* modal section */}
        {/* <Modal
          visible={modalVisible}
          
          onTouchOutside={() => {
            this.setState({ modalVisible: false });
          }}>
          <ModalContent style={modalButtonsContainer}>
            
          </ModalContent>
        </Modal> */}

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

const { width, height } = Dimensions.get('window');
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
    backgroundColor: "#ffffff",
    borderRadius: 10
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
  contanierView: {
    backgroundColor: "#00000033",
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  mapView: {
    position: 'absolute',
    height,
    width
  }
});

export default Home;
