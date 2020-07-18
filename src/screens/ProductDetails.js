import React, {Component} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {colors} from '../constants/color';
import strings from '../strings';
import Carousel from 'react-native-snap-carousel';
import {Button} from '../components';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {
  addToCart,
  removeFromCart,
  incermentCount,
  decermentCount,
} from '../redux/actions/CartActions';
import {getExtras, add_extras_to_item} from '../redux/actions/ProductAction';
import {hScale, vScale, fScale, sWidth} from 'step-scale';
import AsyncStorage from '@react-native-community/async-storage';

class ProductDetails extends Component {
  state = {
    toping: false,
    extras: [],
  };

  // async componentDidMount() {
  //   const token = await AsyncStorage.getItem('@TOKEN')
  //   this.props.getExtras({token});
  // }

  addItemToCart(item) {
    item.extras = this.state.extras;
    // console.log('item', item);

    this.props.addToCart(item);
  }

  handleAddExtraToItem(extras, falg) {
    var extra = this.state.extras;
    if (falg == 'remove') {
      for (var i = 0; i < extra.length; i++) {
        if (extra[i].id == extras.id) {
          extra.splice(i, 1);
        }
      }
    } else {
      extra.push(extras);
    }

    // console.log(extras, extra);

    this.setState({extras: extra});

    // this.props.add_extras_to_item(item, extras);
  }
  inArray(needle) {
    // console.log(needle);
    var haystack = this.state.extras;
    var length = haystack.length;
    for (var i = 0; i < length; i++) {
      if (haystack[i].id == needle) return true;
    }
    return false;
  }
  render() {
    const {toping} = this.state;
    const {selectedProduct, extras} = this.props;
    const noExtras = extras.lenght == 0;
    const {productItem} = selectedProduct;
    const {image, name_en, price, calories} = productItem;
    const {
      headContainer,
      itemNameStyle,
      productImageStyle,
      addContainer,
      plusMinStyle,
      topingContainer,
      addTopingText,
      topingImage,
      confirmButtonStyle,
      countItemContainer,
      iconContainer,
    } = styles;
    return (
      <View style={{flex: 1}}>
        <View style={headContainer}>
          <Text numberOfLines={1} style={[itemNameStyle, {width: hScale(200)}]}>
            {name_en}
          </Text>
          <Text
            style={[
              itemNameStyle,
              {fontSize: fScale(14), justifyContent: 'flex-end'},
            ]}>
            {strings.price} {price} SR
          </Text>
        </View>
        {/* image, add and minus section */}
        <View
          style={{
            alignSelf: 'center',
            alignItems: 'center',
            width: '100%',
            height: vScale(140),
          }}>
          <View style={{alignItems: 'center'}}>
            <Image source={image} style={productImageStyle} />
          </View>
          {/* here */}
        </View>
        <View style={{alignSelf: 'center', marginTop: vScale(35)}}>
          <Text style={{color: '#BF2626'}}>
            {strings.calories} {calories}
          </Text>
        </View>

        <TouchableOpacity
          style={{
            alignSelf: 'center',
            alignItems: 'center',
            justifyContent: 'center',
            marginHorizontal: hScale(10),
            marginVertical: vScale(20),
          }}
          onPress={() => this.setState({toping: !toping})}>
          <View style={topingContainer}>
            <Icon
              name={toping ? 'minus' : 'plus'}
              size={fScale(16)}
              color={colors.white}
            />
          </View>
          <Text style={addTopingText}>Add Extra</Text>
        </TouchableOpacity>

        {/* add topings section */}
        {toping && (
          <>
            {noExtras ? (
              <Text>No Extras</Text>
            ) : (
              <Carousel
                sliderWidth={sWidth}
                itemWidth={hScale(200)}
                ref={c => {
                  this._carousel = c;
                }}
                style={{
                  marginHorizontal: hScale(5),
                  alignSelf: 'center',
                }}
                horizontal
                showsHorizontalScrollIndicator={false}
                data={extras[1]}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({item}) => {
                  const {name_en, image, price, calories} = item;
                  return (
                    <View
                      style={{
                        alignItems: 'center',
                        marginHorizontal: hScale(10),
                      }}>
                      <Image source={image} style={topingImage} />
                      <Text style={addTopingText}>{name_en}</Text>
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          width: hScale(150),
                        }}>
                        <Text style={addTopingText}>
                          {strings.price} {price}
                        </Text>
                        <Text style={addTopingText}>cal: {calories}</Text>
                      </View>
                      <TouchableOpacity
                        style={{
                          alignSelf: 'center',
                          alignItems: 'center',
                          justifyContent: 'center',
                          marginHorizontal: hScale(10),
                          marginTop: vScale(10),
                        }}
                        onPress={() =>
                          this.handleAddExtraToItem(
                            item,
                            this.inArray(item.id) ? 'remove' : 'add',
                          )
                        }>
                        <View style={topingContainer}>
                          <Icon
                            name={this.inArray(item.id) ? 'minus' : 'plus'}
                            size={fScale(16)}
                            color={colors.white}
                          />
                        </View>
                      </TouchableOpacity>
                    </View>
                  );
                }}
              />
            )}
          </>
        )}
        <Button
          title={strings.addToCart}
          buttonStyle={confirmButtonStyle}
          onPress={() => {
            this.addItemToCart(productItem);
            this.props.navigation.goBack();
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  headContainer: {
    width: '100%',
    height: vScale(60),
    marginTop: vScale(25),
    paddingHorizontal: hScale(10),
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  itemNameStyle: {
    width: hScale(110),
    fontSize: fScale(20),
    fontWeight: '700',
    color: '#BF2626',
  },
  productImageStyle: {
    width: hScale(140),
    height: hScale(140),
    borderRadius: hScale(70),
  },
  addContainer: {
    position: 'absolute',
    zIndex: 1,
    bottom: -20,
  },
  plusMinStyle: {
    width: hScale(35),
    height: hScale(35),
    backgroundColor: colors.black,
    alignItems: 'center',
    justifyContent: 'center',
  },
  topingContainer: {
    width: hScale(35),
    height: hScale(35),
    borderRadius: hScale(17.5),
    backgroundColor: colors.buttonBG,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  addTopingText: {
    fontSize: fScale(16),
    color: '#BF2626',
    marginVertical: vScale(5),
  },
  topingImage: {
    width: hScale(80),
    height: hScale(80),
    borderRadius: hScale(40),
  },
  confirmButtonStyle: {
    width: '80%',
    height: vScale(45),
    backgroundColor: colors.buttonBG,
    position: 'absolute',
    zIndex: 1,
    bottom: vScale(20),
  },
  countItemContainer: {
    flexDirection: 'row',
    width: hScale(70),
    justifyContent: 'space-between',
  },
  iconContainer: {
    width: hScale(20),
    height: hScale(20),
    borderRadius: hScale(10),
    borderWidth: 1,
    borderColor: 'gray',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const mapStateToProps = ({cartReducer, productReducer, authReducer}) => {
  const {cart} = cartReducer;
  const {selectedProduct, extras} = productReducer;
  return {cart, selectedProduct, extras};
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      addToCart,
      removeFromCart,
      incermentCount,
      decermentCount,
      getExtras,
      add_extras_to_item,
    },
    dispatch,
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetails);

// import React, {Component} from 'react';
// import {
//   View,
//   Text,
//   Image,
//   StyleSheet,
//   TouchableOpacity,
//   ScrollView,
// } from 'react-native';
// import Icon from 'react-native-vector-icons/FontAwesome';
// import {colors} from '../constants/color';
// import strings from '../strings';
// import Carousel from 'react-native-snap-carousel';
// import {Button} from '../components';
// import {connect} from 'react-redux';
// import {bindActionCreators} from 'redux';
// import {
//   addToCart,
//   removeFromCart,
//   incermentCount,
//   decermentCount,
//   getExtras,
//   add_extras_to_item,
// } from '../redux/actions/CartActions';
// import {hScale, vScale, fScale, sWidth} from 'step-scale';
// import AsyncStorage from '@react-native-community/async-storage';
// import {images} from '../assets';

// class ProductDetails extends Component {
//   state = {
//     toping: false,
//     extras: null,
//   };

//   addItemToCart(item) {
//     this.props.addToCart(item);
//   }

//   handleAddExtraToItem(item) {
//     this.setState({extras : item });
//   }

//   render() {
//     const {toping} = this.state;
//     const {selectedProduct, extras, cart} = this.props;
//     const noExtras = extras.lenght == 0;
//     const {productItem} = selectedProduct;
//     const {image, name_en, price, calories} = productItem;
//     const {
//       headContainer,
//       itemNameStyle,
//       productImageStyle,
//       addContainer,
//       plusMinStyle,
//       topingContainer,
//       addTopingText,
//       topingImage,
//       confirmButtonStyle,
//       countItemContainer,
//       iconContainer,
//     } = styles;
//     // const hasImage = typeof image != null;
//     return (
//       <View style={{flex: 1}}>
//         <View style={headContainer}>
//           <Text numberOfLines={1} style={[itemNameStyle, {width: hScale(200)}]}>
//             {name_en}
//           </Text>
//           <Text
//             style={[
//               itemNameStyle,
//               {fontSize: fScale(14), justifyContent: 'flex-end'},
//             ]}>
//             {strings.price} {price} SR
//           </Text>
//         </View>
//         {/* image, add and minus section */}
//         <View
//           style={{
//             alignSelf: 'center',
//             alignItems: 'center',
//             width: '100%',
//             height: vScale(140),
//           }}>
//           <View style={{alignItems: 'center'}}>
//             <Image
//               source={{
//                 uri:
//                   image ||
//                   'https://drop.ndtv.com/albums/COOKS/pasta-vegetarian/pastaveg_640x480.jpg',
//               }}
//               style={productImageStyle}
//             />
//           </View>
//           {/* here */}
//         </View>
//         <View style={{alignSelf: 'center', marginTop: vScale(35)}}>
//           <Text style={{color: '#BF2626'}}>
//             {strings.calories} {calories}
//           </Text>
//         </View>

//         <TouchableOpacity
//           style={{
//             alignSelf: 'center',
//             alignItems: 'center',
//             justifyContent: 'center',
//             marginHorizontal: hScale(10),
//             marginVertical: vScale(20),
//           }}
//           onPress={() => this.setState({toping: !toping})}>
//           <View style={topingContainer}>
//             <Icon
//               name={toping ? 'minus' : 'plus'}
//               size={fScale(16)}
//               color={colors.white}
//             />
//           </View>
//           <Text style={addTopingText}>Add Extra</Text>
//         </TouchableOpacity>

//         {/* add topings section */}
//         {toping && (
//           <>
//             <Carousel
//               sliderWidth={sWidth}
//               itemWidth={hScale(200)}
//               ref={c => {
//                 this._carousel = c;
//               }}
//               style={{
//                 marginHorizontal: hScale(5),
//                 alignSelf: 'center',
//               }}
//               horizontal
//               showsHorizontalScrollIndicator={false}
//               data={extras ? extras[1] : []}
//               keyExtractor={(item, index) => index.toString()}
//               renderItem={({item}) => {
//                 const {name_en, image, price, calories} = item;
//                 return (
//                   <View
//                     style={{
//                       alignItems: 'center',
//                       marginHorizontal: hScale(10),
//                     }}>
//                     <Image
//                       source={{
//                         uri:
//                           image ||
//                           'https://drop.ndtv.com/albums/COOKS/pasta-vegetarian/pastaveg_640x480.jpg',
//                       }}
//                       style={topingImage}
//                     />
//                     <Text style={addTopingText}>{name_en}</Text>
//                     <View
//                       style={{
//                         flexDirection: 'row',
//                         alignItems: 'center',
//                         justifyContent: 'space-between',
//                         width: hScale(150),
//                       }}>
//                       <Text style={addTopingText}>
//                         {strings.price} {price}
//                       </Text>
//                       <Text style={addTopingText}>cal: {calories}</Text>
//                     </View>
//                     <TouchableOpacity
//                       style={{
//                         alignSelf: 'center',
//                         alignItems: 'center',
//                         justifyContent: 'center',
//                         marginHorizontal: hScale(10),
//                         marginTop: vScale(10),
//                       }}
//                       onPress={() => this.handleAddExtraToItem(item)}>
//                       <View style={topingContainer}>
//                         <Icon
//                           name={'plus'}
//                           size={fScale(16)}
//                           color={colors.white}
//                         />
//                       </View>
//                     </TouchableOpacity>
//                   </View>
//                 );
//               }}
//             />
//           </>
//         )}
//         <Button
//           title={strings.addTocart}
//           buttonStyle={confirmButtonStyle}
//           onPress={() => {
//             this.addItemToCart({...productItem, extras : this.state.extras});
//             this.props.navigation.goBack();
//           }}
//         />
//       </View>
//     );
//   }
// }

// const styles = StyleSheet.create({
//   headContainer: {
//     width: '100%',
//     height: vScale(60),
//     marginTop: vScale(25),
//     paddingHorizontal: hScale(10),
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     flexDirection: 'row',
//   },
//   itemNameStyle: {
//     width: hScale(110),
//     fontSize: fScale(20),
//     fontWeight: '700',
//     color: '#BF2626',
//   },
//   productImageStyle: {
//     width: hScale(140),
//     height: hScale(140),
//     borderRadius: hScale(70),
//   },
//   addContainer: {
//     position: 'absolute',
//     zIndex: 1,
//     bottom: -20,
//   },
//   plusMinStyle: {
//     width: hScale(35),
//     height: hScale(35),
//     backgroundColor: colors.black,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   topingContainer: {
//     width: hScale(35),
//     height: hScale(35),
//     borderRadius: hScale(17.5),
//     backgroundColor: colors.buttonBG,
//     alignSelf: 'center',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   addTopingText: {
//     fontSize: fScale(16),
//     color: '#BF2626',
//     marginVertical: vScale(5),
//   },
//   topingImage: {
//     width: hScale(80),
//     height: hScale(80),
//     borderRadius: hScale(40),
//   },
//   confirmButtonStyle: {
//     width: '80%',
//     height: vScale(45),
//     backgroundColor: colors.buttonBG,
//     position: 'absolute',
//     zIndex: 1,
//     bottom: vScale(20),
//   },
//   countItemContainer: {
//     flexDirection: 'row',
//     width: 70,
//     justifyContent: 'space-between',
//   },
//   iconContainer: {
//     width: 20,
//     height: 20,
//     borderRadius: 10,
//     borderWidth: 1,
//     borderColor: 'gray',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });

// const mapStateToProps = ({cartReducer, authReducer}) => {
//   const {user} = authReducer;
//   const {cart, selectedProduct, extras} = cartReducer;
//   return {cart, selectedProduct,   , extras};
// };

// const mapDispatchToProps = dispatch => {
//   return bindActionCreators(
//     {
//       addToCart,
//       removeFromCart,
//       incermentCount,
//       decermentCount,
//       getExtras,
//       add_extras_to_item,
//     },
//     dispatch,
//   );
// };

// export default connect(mapStateToProps, mapDispatchToProps)(ProductDetails);
