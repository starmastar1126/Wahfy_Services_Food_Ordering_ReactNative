import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { connect } from 'react-redux';
import { hScale, vScale, sWidth, fScale } from 'step-scale';
import { getOffersMenu } from '../redux/actions/OfferActions';
import { addToCart, removeFromCart } from '../redux/actions/CartActions';
import { bindActionCreators } from 'redux';
import { colors } from '../constants';
import strings from '../strings';
import AsyncStorage from '@react-native-community/async-storage';

class OffersMenu extends Component {
  state = { buy: 0, get: 0, cart: [] }
  async componentDidMount() {
    const token = await AsyncStorage.getItem('@TOKEN')
    const { navigation } = this.props;
    const type = this.props.navigation.getParam('serviceType');
    const id = navigation.getParam('offerId');

    this.props.getOffersMenu({ token, id, type });
  }
  // componentDidMount() {
  //   const { token } = this.props.user.data;
  //   const { navigation } = this.props;
  //   const type = this.props.navigation.getParam('serviceType');
  //   const id = navigation.getParam('offerId');
  //   this.props.getOffersMenu({ token, id, type });
  // }

  addItemToCart(item, flag) {

    var cart = this.state.cart
    cart.push(item)
    if (flag == 1) {
      this.setState({ buy: Number(this.state.buy) + Number(1), cart: cart })
    } else if (flag == 2) {
      this.setState({ get: Number(this.state.get) + Number(1), cart: cart })
    }
  }
  removeFromCart(id, flag) {
    var cart = this.state.cart
    for (var i = 0; i < cart.length; i++) {
      if (cart[i].id == id) {
        cart.splice(i, 1);
      }
    }
    if (flag == 1) {
      this.setState({ buy: Number(this.state.buy) - Number(1), cart: cart })
    } else if (flag == 2) {
      this.setState({ get: Number(this.state.get) - Number(1), cart: cart })
    }
  }
  addCart() {
    var cart = this.state.cart
    cart.forEach(item => {
      this.props.addToCart(item);
    });
    this.props.navigation.navigate('Cart')

  }
  inArray(needle) {
    // console.log(needle);
    var haystack = this.state.cart;
    var length = haystack.length;
    for (var i = 0; i < length; i++) {
      if (haystack[i].id == needle) return true;
    }
    return false;
  }
  render() {
    const {
      menuListStyle,
      menuItemContainer,
      menuImageStyle,
      titleStyle,
      buttonStyle,
    } = styles;
    const { offersMenu, loading, cart } = this.props;
    const offerType = this.props.navigation.getParam('offerType');
    const buy = this.props.navigation.getParam('buy');
    const get = this.props.navigation.getParam('get');
    const type = offerType == 'discount';

    // console.log('cart', this.state.cart);

    return (
      <>
        {loading ? (
          <ActivityIndicator
            size="large"
            color={colors.buttonBG}
            style={{ marginTop: 15 }}
          />
        ) : (
            <View style={{ flex: 1 }}>
              <FlatList
                style={menuListStyle}
                contentContainerStyle={{ paddingHorizontal: hScale(10) }}
                showsVerticalScrollIndicator={false}
                data={offersMenu}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => {
                  // console.log('asdasdasdasd', item.details);
                  return (
                    <>
                      {type ? (
                        <FlatList
                          data={item.details ? item.details.items : []}
                          keyExtractor={(item, index) => item.id}
                          renderItem={({ item }) => {
                            const isExist = cart.includes(item);
                            const {
                              id,
                              image,
                              name_en,
                              offer_price,
                              description,
                            } = item;
                            return (
                              <View key={id} style={menuItemContainer}>
                                <Image
                                  source={image != null && { uri: image }}
                                  style={menuImageStyle}
                                />
                                <View
                                  style={{
                                    alignItems: 'flex-start',
                                    justifyContent: 'flex-start',
                                  }}>
                                  <Text style={titleStyle}>{name_en}</Text>
                                  <Text style={titleStyle}>
                                    {strings.price} {offer_price}
                                  </Text>
                                  <Text
                                    numberOfLines={2}
                                    style={{ width: hScale(110) }}>
                                    {description}
                                  </Text>
                                </View>

                                <TouchableOpacity
                                  style={buttonStyle}
                                  onPress={() => this.props.addToCart(item)}>
                                  <Text
                                    style={{
                                      color: colors.white,
                                      textAlign: 'center',
                                    }}>
                                    Add to cart
                              </Text>
                                </TouchableOpacity>
                              </View>
                            );
                          }}
                        />
                      ) : (
                          <>
                            {/* -------- buy section --------- */}
                            {item.details &&
                              item.details.buy_items &&
                              item.details.buy_items.length != 0 && (
                                <View
                                  style={{
                                    width: '100%',
                                    height: 50,
                                    backgroundColor: colors.buttonBG,
                                    justifyContent: 'center',
                                    marginVertical: 10,
                                  }}>
                                  <Text
                                    style={{
                                      fontSize: 20,
                                      fontWeight: 'bold',
                                      marginStart: 8,
                                      color: 'white',
                                    }}>
                                    Buy {item.details && item.details.buy_quantity}
                                  </Text>
                                </View>
                              )}

                            <FlatList
                              data={item.details ? item.details.buy_items : []}
                              listKey={(item, index) => `>>>${item.id}${index}`}
                              renderItem={({ item }) => {
                                const { id, image, name_en, price, description } = item;
                                const isExist = this.inArray(item.id)
                                // console.log(isExist);

                                return (
                                  <>
                                    <View key={id} style={menuItemContainer}>
                                      <Image
                                        source={image != null && { uri: image }}
                                        style={menuImageStyle}
                                      />
                                      <View
                                        style={{
                                          alignItems: 'flex-start',
                                          justifyContent: 'flex-start',
                                        }}>
                                        <Text style={titleStyle}>{name_en}</Text>
                                        <Text style={titleStyle}>
                                          {strings.price} {price}
                                        </Text>
                                        <Text
                                          numberOfLines={2}
                                          style={{ width: hScale(110) }}>
                                          {description}
                                        </Text>
                                      </View>

                                      <TouchableOpacity
                                        style={buttonStyle}
                                        onPress={() => {
                                          if (this.inArray(item.id)) {
                                            this.removeFromCart(item.id, 1)
                                          } else {
                                            if (buy > this.state.buy) {
                                              this.addItemToCart(item, 1)
                                            } else {
                                              alert('max allowed items')
                                            }
                                          }

                                          // this.props.navigation.navigate('Cart');
                                        }}>
                                        <Text
                                          style={{
                                            color: colors.white,
                                            textAlign: 'center',
                                          }}>
                                          {this.inArray(item.id) ? "Remove from cart" : "Add to cart"}
                                        </Text>
                                      </TouchableOpacity>
                                    </View>
                                  </>
                                );
                              }}
                            />

                            {item.details &&
                              item.details.get_items &&
                              item.details.get_items.length != 0 && (
                                <View
                                  style={{
                                    width: '100%',
                                    height: 50,
                                    backgroundColor: colors.buttonBG,
                                    justifyContent: 'center',
                                    marginVertical: 10,
                                  }}>
                                  <Text
                                    style={{
                                      fontSize: 20,
                                      fontWeight: 'bold',
                                      marginStart: 8,
                                      color: 'white',
                                    }}>
                                    Get {item.details && item.details.get_quantity}
                                  </Text>
                                </View>
                              )}

                            <FlatList
                              data={item.details ? item.details.get_items : []}
                              listKey={(item, index) => `@=>${index.toString()}`}
                              renderItem={({ item }) => {

                                const {
                                  id,
                                  image,
                                  name_en,
                                  offer_price,
                                  description,
                                } = item;
                                item.price = 0
                                const isExist = cart.includes(item);
                                return (
                                  <>
                                    <View key={id} style={menuItemContainer}>
                                      <Image
                                        source={image != null && { uri: image }}
                                        style={menuImageStyle}
                                      />
                                      <View
                                        style={{
                                          alignItems: 'flex-start',
                                          justifyContent: 'flex-start',
                                        }}>
                                        <Text style={titleStyle}>{name_en}</Text>
                                        <Text style={titleStyle}>
                                          {strings.price} {offer_price}
                                        </Text>
                                        <Text
                                          numberOfLines={2}
                                          style={{ width: hScale(110) }}>
                                          {description}
                                        </Text>
                                      </View>

                                      <TouchableOpacity
                                        style={buttonStyle}
                                        onPress={() => {
                                          if (this.inArray(item.id)) {
                                            this.removeFromCart(item.id, 2)
                                          } else {
                                            if (get > this.state.get) {
                                              this.addItemToCart(item, 2)
                                            } else {
                                              alert('max allowed items')
                                            }
                                          }
                                        }}>
                                        <Text
                                          style={{
                                            color: colors.white,
                                            textAlign: 'center',
                                          }}>
                                          {this.inArray(item.id) ? "Remove from cart" : "Add to cart"}
                                        </Text>
                                      </TouchableOpacity>
                                    </View>
                                  </>
                                );
                              }}
                            />

                            {/* <View>

                        
                      </View> */}
                          </>
                        )}
                    </>
                  );
                }}
              />
              {buy > 1 && this.state.buy == buy && this.state.get == get ?
                <TouchableOpacity
                  style={buttonStyle}
                  onPress={() => this.addCart()}>
                  <Text
                    style={{
                      color: colors.white,
                      textAlign: 'center',
                    }}>
                    {"Save To cart"}
                  </Text>
                </TouchableOpacity> : null}
            </View>

          )}
      </>
    );
  }
}

const styles = StyleSheet.create({
  menuListStyle: {
    marginTop: vScale(15),
    width: sWidth,
    height: vScale(280),
  },
  titleStyle: {
    fontSize: fScale(15),
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: vScale(5),
  },
  menuItemContainer: {
    width: '95%',
    height: 130,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    borderWidth: 0.5,
    borderColor: '#cfcfcf',
    borderRadius: 10,
    alignSelf: 'center',
  },
  menuImageStyle: {
    width: hScale(110),
    height: vScale(90),
    borderRadius: hScale(10),
    resizeMode: 'cover',
  },
  buttonStyle: {
    width: hScale(70),
    height: vScale(40),
    backgroundColor: 'orange',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'flex-end',
    borderRadius: hScale(10),
    position: 'absolute',
    zIndex: 1,
    end: 10,
    bottom: 10,
  },
  menuListStyle: {
    marginTop: vScale(5),
    width: sWidth,
    height: vScale(280),
  },
});

const mapStateToProps = ({ offersReducer, authReducer, cartReducer }) => {
  const { offersMenu, loading } = offersReducer;
  const { user } = authReducer;
  const { cart } = cartReducer;
  return { user, offersMenu, cart, loading };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      getOffersMenu,
      addToCart,
      removeFromCart
    },
    dispatch,
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(OffersMenu);
