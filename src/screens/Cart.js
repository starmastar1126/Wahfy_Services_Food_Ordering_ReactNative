import React, { Component } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  addToCart,
  removeFromCart,
  incermentCount,
  decermentCount,
} from '../redux/actions/CartActions';
import { Button } from '../components';
import strings from '../strings';
import { vScale } from 'step-scale';
import { colors } from '../constants';
import { EmptyScreen } from './EmptyScreen';
import { images } from '../assets';
import Icon from 'react-native-vector-icons/FontAwesome';

class Cart extends Component {
  constructor(props) {
    super(props);
    this.forceUpdateHandler = this.forceUpdateHandler.bind(this);
  }
  state = {
    totalPrice: 0,
  };

  forceUpdateHandler() {
    this.forceUpdate();
  }

  handleDecrementCount(item, cart, qty, isExist) {
    this.props.decermentCount(item, cart);
    this.forceUpdateHandler();
    if (isExist && qty < 2) {
      this.props.removeFromCart(item.product.id);
      this.forceUpdateHandler();
    }
  }

  handleIncrementCount(item, cart) {
    this.props.incermentCount(item, cart);
    this.forceUpdateHandler();
  }

  render() {
    const { cart } = this.props;

    const emptyCart = cart.length == 0;

    const getQty = cart.map(item => item.qty);// get Quantity

    const cartPrice = cart.map(item => Number(item.product.price));// get prices

    const cartSubTotalPrice = cartPrice.reduce((a, b) => a + b, 0)
    // console.warn(cartSubTotalPrice)

    const taxes = cartSubTotalPrice.toFixed(2) * (5 / 100);

    const cartTotalPrice = cartSubTotalPrice + taxes

    const {
      container,
      countItemContainer,
      headContainerStyle,
      headTextsStyle,
      imageStyle,
      iconContainer,
      buttonStyle,
    } = styles;
    return (
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: vScale(20),
        }}>
        {emptyCart ? (
          <EmptyScreen image={images.emptyCart} text={strings.emptyCart} />
        ) : (
            <FlatList
              data={cart}
              style={{
                borderWidth: 0.5,
                borderRadius: 10,
                marginBottom: 10,
              }}
              contentContainerStyle={{
                paddingBottom: vScale(20),
                alignItems: 'center',
                justifyContent: 'center',
              }}
              ItemSeparatorComponent={() => (
                <View style={{ borderBottomWidth: 0.5, borderRadius: 10 }} />
              )}
              showsVerticalScrollIndicator={false}
              extraData={this.props}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item, index }) => {
                // console.log(item);

                const { product, qty } = item;
                const { image, name_en, price, extras, calories } = product;
                const isExist = cart.includes(item);
                return (
                  <View style={container}>
                    <View style={{ flexDirection: 'row' }}>
                      {image ? <Image source={{ uri: image }} style={imageStyle} /> : null}
                      <View style={{ marginStart: 10 }}>
                        <View style={headContainerStyle}>
                          <Text style={headTextsStyle}>{name_en}</Text>
                          <View style={countItemContainer}>
                            <TouchableOpacity
                              style={iconContainer}
                              onPress={() =>
                                this.handleDecrementCount(
                                  item,
                                  cart,
                                  qty,
                                  isExist,
                                )
                              }>
                              <Icon name="minus" size={14} color={colors.black} />
                            </TouchableOpacity>
                            <Text>{item.qty}</Text>
                            <TouchableOpacity
                              style={iconContainer}
                              onPress={() =>
                                this.handleIncrementCount(item, cart)
                              }>
                              <Icon name="plus" size={14} color={colors.black} />
                            </TouchableOpacity>
                          </View>
                        </View>

                        <View
                          style={{
                            flexDirection: 'row',
                            marginVertical: 8,
                            width: 215,
                            justifyContent: 'flex-end',
                          }}>
                          <Text
                            style={{
                              fontSize: 13,
                              fontWeight: '500',
                              color: colors.buttonBG,
                            }}>
                            Cal : {calories ? calories * qty : calories}
                          </Text>
                          <Text
                            style={{
                              fontSize: 13,
                              fontWeight: '500',
                              color: 'green',
                              marginStart: 30,
                            }}>
                            price : {price ? price * qty : 0}
                          </Text>
                        </View>
                        <View
                          style={{
                            marginVertical: 10,
                            width: 220,
                            alignItems: 'center',
                            justifyContent: 'space-between',
                          }}>
                          {/* <View style={headContainerStyle}>
                          <Text
                            style={{
                              fontSize: 13,
                              fontWeight: '500',
                              marginVertical: 2,
                              color: '#BF2626',
                              flexDirection: 'row',
                            }}>
                            Extra
                          </Text>
                          <View style={countItemContainer}>
                            <TouchableOpacity
                              style={iconContainer}
                              onPress={() => this.props.decermentCount(id)}>
                              <Icon
                                name="minus"
                                size={14}
                                color={colors.black}
                              />
                            </TouchableOpacity>
                            <Text style={{fontSize: 15, fontWeight: 'bold'}}>
                              {qty}
                            </Text>
                            <TouchableOpacity
                              style={iconContainer}
                              onPress={() => this.props.incermentCount(id)}>
                              <Icon
                                name="plus"
                                size={14}
                                color={colors.black}
                              />
                            </TouchableOpacity>
                          </View>
                        </View> */}
                          {item.product.offer_price ?
                            <View
                              style={{
                                flexDirection: 'row',
                                marginVertical: 8,
                                width: 180,
                                alignSelf: 'flex-end',
                                justifyContent: 'space-between',
                              }}>
                              <Text
                                style={{
                                  fontSize: 13,
                                  fontWeight: '500',
                                  color: colors.buttonBG,
                                }}>
                                Cal : 100
                          </Text>
                              <Text
                                style={{
                                  fontSize: 13,
                                  fontWeight: '500',
                                  color: 'green',
                                }}>
                                offer price :{item.product.offer_price}
                              </Text>
                            </View> : null}
                        </View>
                      </View>
                    </View>
                  </View>
                );
              }}
              ListFooterComponent={() => {
                return (
                  <View style={{ alignItems: 'center' }}>
                    <Text
                      style={{
                        width: 260,
                        marginVertical: 10,
                        color: colors.buttonBG,
                        alignSelf: 'center',
                      }}>
                      ----------------------------------------
                  </Text>
                    <View
                      style={{
                        width: 220,
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                      }}>
                      <Text
                        style={{
                          fontSize: 16,
                          fontWeight: 'bold',
                          color: '#BF2626',
                        }}>
                        Sub Total :
                    </Text>
                      <Text
                        style={{
                          fontSize: 16,
                          fontWeight: 'bold',
                          color: '#BF2626',
                        }}>
                        {cartSubTotalPrice ? cartSubTotalPrice : 0}
                        SR
                    </Text>
                    </View>

                    <View
                      style={{
                        width: 220,
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        marginTop: 10,
                      }}>
                      <Text
                        style={{
                          fontSize: 16,
                          fontWeight: 'bold',
                          color: '#BF2626',
                        }}>
                        Tax :
                    </Text>
                      <Text
                        style={{
                          fontSize: 16,
                          fontWeight: 'bold',
                          color: '#BF2626',
                        }}>
                        {taxes ? taxes : 0} SR
                    </Text>
                    </View>

                    {/* <View
                    style={{
                      width: 220,
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      marginTop: 10,
                    }}>
                    <Text
                      style={{
                        fontSize: 16,
                        fontWeight: 'bold',
                        color: '#BF2626',
                      }}>
                      Delivery :
                    </Text>
                    <Text
                      style={{
                        fontSize: 16,
                        fontWeight: 'bold',
                        color: '#BF2626',
                      }}>
                      {cartTotalPrice ? cartTotalPrice * qty : cartTotalPrice}{' '}
                      SR
                    </Text>
                  </View> */}

                    <View
                      style={{
                        width: 220,
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        marginTop: 10,
                      }}>
                      <Text
                        style={{
                          fontSize: 16,
                          fontWeight: 'bold',
                          color: '#BF2626',
                        }}>
                        Total :
                    </Text>
                      <Text
                        style={{
                          fontSize: 16,
                          fontWeight: 'bold',
                          color: '#BF2626',
                        }}>
                        {cartTotalPrice ? cartTotalPrice : 0} SR
                    </Text>
                    </View>
                  </View>
                );
              }}
            />
          )}
        {!emptyCart && (
          <Button
            title={strings.checkout}
            buttonStyle={buttonStyle}
            onPress={() => this.props.navigation.navigate('Checkout')}
          />
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: '95%',

    alignSelf: 'center',
    marginTop: 20,
    padding: 10,
  },
  countItemContainer: {
    flexDirection: 'row',
    width: 70,
    justifyContent: 'space-between',
  },
  iconContainer: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'gray',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headContainerStyle: {
    width: 220,
    height: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  imageStyle: {
    width: 90,
    height: 70,
    borderRadius: 10,
  },
  headTextsStyle: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  buttonStyle: {
    marginBottom: vScale(15),
  },
});

const mapStateToProps = ({ cartReducer }) => {
  const { cart } = cartReducer;
  console.log('carrrrrrr', cart);

  return { cart };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      addToCart,
      removeFromCart,
      incermentCount,
      decermentCount,
    },
    dispatch,
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
