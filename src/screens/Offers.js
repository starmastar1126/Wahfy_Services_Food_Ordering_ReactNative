import React, { Component } from 'react';
import { FlatList, ActivityIndicator, View } from 'react-native';
import { OfferCard } from '../components/OfferCard';
//import ListView from '../components/OfferCard';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getOffers } from '../redux/actions/OfferActions';
import { colors } from '../constants';
import AsyncStorage from '@react-native-community/async-storage';
import { base_URL } from '../services/API';


class Offers extends Component {
  // componentDidMount() {
  //   const {token} = this.props.user.data;
  //   this.props.getOffers({token});
  // }
  state = {
    loading: true,
    dataOffers: null
  }
  async componentDidMount() {
    //const token = await AsyncStorage.getItem('@TOKEN')
    const { token } = this.props.user.data;
    const data = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json'
      }
    };
    const userResult = await fetch(`${base_URL}offers`, data);
    await userResult.json().then(res => {
      console.log(res.data.data);
      this.setState({ loading: false, dataOffers: res.data.data })
    });
    //this.props.getOffers({ token });
  }
  render() {
    const { dataOffers, loading } = this.state;
    const { navigation } = this.props
    return (
      <>
        {loading ? (
          <ActivityIndicator
            size="large"
            color={colors.buttonBG}
            style={{ marginTop: 15 }}
          />
        ) : (
            // <FlatList
            //   style={{ paddingTop: 20 }}
            //   data={dataOffers}
            //   keyExtractor={(item) => item.id.toString()}
            //   renderItem={({ item, index }) => (
            //     <ListView
            //       item={item}
            //       index={index}
            //       navigation={navigation}
            //     />
            //   )}
            // />
            <FlatList
              style={{ paddingTop: 20 }}
              data={dataOffers}//offers[1]
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => {
                // console.log('buy_get', item.buy_get);
                return (
                  <OfferCard
                    item={item}
                    onPress={() =>
                      this.props.navigation.navigate('OffersMenu', {
                        buy: item.buy_get ? item.buy_get.buy_quantity : 0,
                        get: item.buy_get ? item.buy_get.get_quantity : 0,
                        offerId: item.id,
                        serviceType: item.service_type,
                        offerType: item.offer_type,

                      })
                    }
                  />
                );
              }}
            />
          )}
      </>
    );
  }
}

const mapStateToProps = ({ offersReducer, authReducer }) => {
  const { offers, loading } = offersReducer;
  const { user } = authReducer;
  return { offers, user, loading };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      getOffers,
    },
    dispatch,
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Offers);
