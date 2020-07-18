import React, { Component } from 'react';
import { FlatList, TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { colors } from '../constants';
import strings from '../strings';
import { AddressCard } from '../components';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { deleteAddress } from '../redux/actions';
import { base_URL } from '../services/API';
import {getAddresses} from '../redux/actions/AddressesAction'

class MyAddresses extends Component {
  state = {
    selectedAddressId: null,
    addresses: [],
  };
  static navigationOptions = () => ({
    headerStyle: { backgroundColor: 'orange' },
    headerTintColor: colors.white,
    headerTitle: strings.myAddresses,
  });

  componentDidMount() {
    this.getAddresses();
  }

  async getAddresses() {
    const { token } = this.props.user.data;
    const request = await fetch(`${base_URL}address`, {
      method: 'GET',
      headers: {
        Authorization: token ? `Bearer ${token}` : '',
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
    const myAddresses = await request.json();
    const add = myAddresses.data
    console.warn(add[0])
    this.setState({ addresses: myAddresses.data });
  }


  render() {
    const { buttonStyle } = styles;
    const { selectedAddressId, addresses } = this.state;
    const { myAddresses } = this.props
    const isEmptyAddresses = addresses.length == 0;
    return (
      <>
        {isEmptyAddresses ? (
          <View
            style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <TouchableOpacity
              style={buttonStyle}
              onPress={() => this.props.navigation.navigate('AddAddress')}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Icon name="plus" size={14} color={colors.buttonBG} />
                <Text
                  style={{
                    fontSize: 15,
                    color: colors.buttonBG,
                    marginStart: 5,
                  }}>
                  {strings.addNewAddress}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        ) : (
            <FlatList
              style={{ marginVertical: 30 }}
              data={addresses}
              // extraData={this.state}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item, index }) => {
                const isSelected = index == selectedAddressId;
                return (
                  <AddressCard
                    item={item}
                    isSelected={isSelected}
                    onPress={() => {
                      this.setState({ selectedAddressId: index });
                      this.props.navigation.navigate('Menu');
                    }}
                  />
                );
              }}
              ListFooterComponent={
                <TouchableOpacity
                  style={buttonStyle}
                  onPress={() => this.props.navigation.navigate('AddAddress')}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <Icon name="plus" size={14} color={colors.buttonBG} />
                    <Text
                      style={{
                        fontSize: 15,
                        color: colors.buttonBG,
                        marginStart: 5,
                      }}>
                      {strings.addNewAddress}
                    </Text>
                  </View>
                </TouchableOpacity>
              }
            />
          )}
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: '90%',
    height: 130,
    borderWidth: 0.5,
    borderColor: '#b8b3b3',
    alignSelf: 'center',
    marginTop: 10,
    paddingVertical: 15,
  },
  headContainer: {
    flexDirection: 'row',
    marginStart: 15,
    alignItems: 'center',
  },
  selectionContainer: {
    width: 25,
    height: 25,
    borderRadius: 12.5,
    borderWidth: 1,
    borderColor: '#b8b3b3',
    alignItems: 'center',
    justifyContent: 'center',
    marginEnd: 10,
  },
  selectedView: {
    width: 15,
    height: 15,
    borderRadius: 7.5,
    backgroundColor: colors.buttonBG,
  },
  iconContainer: {
    width: 22,
    height: 22,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    zIndex: 1,
    end: 15,
  },
  addressContainer: {
    width: '90%',
    height: 80,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  buttonStyle: {
    width: '90%',
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: 'gray',
    borderWidth: 0.5,
    alignSelf: 'center',
    marginTop: 15,
  },
});

const mapStateToProps = ({ addressReducer, authReducer }) => {
  const { myAddresses } = addressReducer;
  const { user } = authReducer;
  return { myAddresses, user };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      getAddresses,
      deleteAddress,
    },
    dispatch,
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(MyAddresses);
