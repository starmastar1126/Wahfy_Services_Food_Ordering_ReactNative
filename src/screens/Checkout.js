import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import strings from '../strings';
import { hScale, vScale, fScale } from 'step-scale';
import moment from 'moment';
import { Button } from '../components';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
// import {addToCart, removeFromCart} from '../redux/actions/CartActions';

const address =
  'E-210, App innovation, Sector 74, industrial area, Phase, Mohali, India, 160002';
const from = 4.0;
const to = 4.0;
class Checkout extends Component {
  state = {
    type: '',
  };

  render() {
    const { type } = this.state;
    const { user } = this.props;
    const { name, phone, email } = user.data.userData;
    const {
      container,
      namePhoneContainer,
      nameTextStyle,
      PhoneTextStyle,
      addressCardContainer,
      addressHeadContainer,
      addressContainer,
      branchHeadContainer,
      TotalContainer,
      buttonStyle,
    } = styles;
    const serviceType = type == 'Delivery';

    const branch = this.props.navigation.getParam('branchItem')
    // console.warn(branch)

    return (
      <View style={container}>
        <View style={namePhoneContainer}>
          <Text style={nameTextStyle}>{strings.fullName}:</Text>
          <Text style={PhoneTextStyle}>{name}</Text>
        </View>
        <View style={[namePhoneContainer, { marginTop: vScale(10) }]}>
          <Text style={nameTextStyle}>{strings.phone}:</Text>
          <Text style={PhoneTextStyle}> {phone} </Text>
        </View>
        <View style={[namePhoneContainer, { marginTop: vScale(10) }]}>
          <Text style={nameTextStyle}>{strings.email}:</Text>
          <Text style={PhoneTextStyle}>{email}</Text>
        </View>
        {serviceType ? (
          <>
            <Text
              style={{ fontSize: fScale(18), marginTop: 50, color: '#BF2626' }}>
              Your Delivery will be on
            </Text>
            <TouchableOpacity style={addressCardContainer} disabled>
              <View style={addressHeadContainer}>
                <Text style={{ color: '#d35400' }}>Salah Salem</Text>
              </View>
              <View style={addressContainer}>
                <Text numberOfLines={2} style={{ color: '#d35400' }}>
                  {address}
                </Text>
              </View>
            </TouchableOpacity>
          </>
        ) : (
            <>
              <Text
                style={{ fontSize: fScale(18), marginTop: 50, color: '#BF2626' }}>
                Receive your order from
            </Text>
              <TouchableOpacity style={branchHeadContainer} disabled>
                <View style={addressHeadContainer}>
                  <Text style={{ color: '#31B990' }}>Damam</Text>
                </View>
                <View style={addressContainer}>
                  <Text numberOfLines={2} style={{ color: '#31B990' }}>
                    {address}
                  </Text>
                </View>

                <View
                  style={{
                    flexDirection: 'row',
                    width: '90%',
                    alignItems: 'center',
                    alignSelf: 'center',
                    justifyContent: 'space-between',
                  }}>
                  <Text style={{ color: '#31B990' }}>{strings.workingHours}</Text>
                  <Text style={{ color: 'green' }}>
                    {strings.from} {moment(from).format('LT')}
                  </Text>
                  <Text style={{ color: 'red' }}>
                    {strings.to} {moment(to).format('LT')}
                  </Text>
                </View>
              </TouchableOpacity>
            </>
          )}
        <View style={TotalContainer}>
          <Text style={{ fontSize: 20, color: 'green' }}>Total: </Text>
          <Text style={{ fontSize: 20, color: 'green' }}>1000 SR</Text>
        </View>
        <Button
          title={strings.confirmOrder}
          buttonStyle={buttonStyle}
          onPress={() => alert('Order successfully sent')}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  namePhoneContainer: {
    width: '100%',
    marginTop: vScale(30),
    marginStart: hScale(40),
    flexDirection: 'row',
    alignItems: 'center',
  },
  nameTextStyle: {
    fontSize: fScale(18),
    fontWeight: 'bold',
    color: '#192a56',
  },
  PhoneTextStyle: {
    fontSize: fScale(14),
    fontWeight: '600',
    color: '#192a56',
    marginTop: 3,
  },
  addressCardContainer: {
    width: '90%',
    height: 130,
    borderWidth: 0.5,
    borderColor: '#d35400',
    alignSelf: 'center',
    marginTop: 10,
    paddingVertical: 15,
  },
  addressHeadContainer: {
    flexDirection: 'row',
    marginStart: 15,
    alignItems: 'center',
  },
  addressContainer: {
    width: '90%',
    height: 80,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  branchHeadContainer: {
    width: '90%',
    height: vScale(150),
    borderWidth: 0.5,
    borderColor: '#b8b3b3',
    alignSelf: 'center',
    marginTop: vScale(10),
    paddingVertical: hScale(15),
  },
  TotalContainer: {
    width: hScale(220),
    marginTop: vScale(70),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  buttonStyle: {
    position: 'absolute',
    bottom: vScale(50),
  },
});

const mapStateToProps = ({ authReducer, cartReducer }) => {
  const { user } = authReducer;
  const { cart } = cartReducer;
  return { user, cart };
};

export default connect(mapStateToProps, null)(Checkout);
