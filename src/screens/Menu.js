import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  FlatList,
  Image,
  ScrollView,
  ActivityIndicator,
  I18nManager,
} from 'react-native';
import strings from '../strings';
import {images} from '../assets';
import Swiper from 'react-native-swiper';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {
  addToCart,
  removeFromCart,
  fetchCategories,
  getMenu,
  get_product,
  getExtras,
} from '../redux/actions/CartActions';
import {hScale, vScale, fScale, sWidth} from 'step-scale';
import {colors} from '../constants';
import AsyncStorage from '@react-native-community/async-storage';

const {isRTL} = I18nManager;

class Menu extends Component {
  state = {
    categories: [],
    menuItems: [],
    extras: [],
    screenLoading: true,
    catId: 1,
  };

  componentDidMount(id) {
    this.getCategories();
    this.getMenuItems(id);
  }

  async getCategories() {
    const token = await AsyncStorage.getItem('@TOKEN');
    this.props.fetchCategories({token});
  }

  async getMenuItems(id) {
    const token = await AsyncStorage.getItem('@TOKEN');
    const catId = id || 1;
    this.props.getMenu({catId});
    this.props.getExtras({catId});
  }

  handleSelectedProduct(item) {
    this.props.get_product(item);
  }

  addItemToCart(item) {
    this.props.addToCart(item);
  }

  render() {
    const swiperImages = [
      {
        id: 1,
        image:
          'https://images.unsplash.com/photo-1482049016688-2d3e1b311543?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=60',
      },
      {
        id: 2,
        image:
          'https://images.unsplash.com/photo-1543362906-acfc16c67564?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=60',
      },
      {
        id: 3,
        image:
          'https://images.unsplash.com/photo-1484723091739-30a097e8f929?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=60',
      },
    ];

    const {
      container,
      bannerContainer,
      bannerStyle,
      itemContainer,
      menuContainer,
      menuTextStyle,
      itemImageStyle,
      titleStyle,
      menuItemContainer,
      buttonStyle,
      menuImageStyle,
      menuListStyle,
      relatedItemContainer,
      relatedItemImageStyle,
    } = styles;
    const {categories, cart, loading, subCategory} = this.props;
    return (
      <ScrollView
        style={container}
        contentContainerStyle={{
          alignItems: 'center',
          justifyContent: 'center',
        }}
        showsVerticalScrollIndicator={false}>
        {loading ? (
          <ActivityIndicator
            size="large"
            color={colors.buttonBG}
            style={{marginTop: 15}}
          />
        ) : (
          <>
            <View style={bannerContainer}>
              <Swiper
                width={'100%'}
                height={'25%'}
                autoplay
                autoplayTimeout={3}
                autoplayDirection={true}>
                {swiperImages.map((slide, index) => {
                  return (
                    <Image
                      key={index}
                      resizeMode="cover"
                      style={bannerStyle}
                      source={{uri: slide.image}}
                    />
                  );
                })}
              </Swiper>
            </View>

            <FlatList
              style={{marginTop: 5}}
              contentContainerStyle={{
                paddingHorizontal: 5,
                alignItems: 'center',
                justifyContent: 'center',
              }}
              showsHorizontalScrollIndicator={false}
              data={categories[0]}
              keyExtractor={(item, index) => index.toString()}
              horizontal
              renderItem={({item}) => {
                const {id, image, name_en} = item;
                const hasImage = image != null;
                return (
                  <TouchableOpacity onPress={() => this.getMenuItems(id)}>
                    {hasImage ? (
                      <Image source={{uri: image}} style={itemImageStyle} />
                    ) : (
                      <Image source={images.food_1} style={itemImageStyle} />
                    )}
                    <Text style={titleStyle}>{name_en}</Text>
                  </TouchableOpacity>
                );
              }}
            />
            <View style={[menuContainer, isRTL && {alignItems: 'flex-start'}]}>
              <Text style={[menuTextStyle]}>{strings.menu}</Text>
            </View>
            {/* menu list */}
            <FlatList
              style={menuListStyle}
              contentContainerStyle={{paddingHorizontal: hScale(10)}}
              showsVerticalScrollIndicator={false}
              data={subCategory[1]}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({item}) => {
                const {id, image, name_en, price, description_en} = item;
                return (
                  <TouchableOpacity
                    key={id}
                    style={menuItemContainer}
                    onPress={() => {
                      this.handleSelectedProduct(item);
                      this.props.navigation.navigate('ProductDetails');
                    }}>
                    <Image source={{uri: image}} style={menuImageStyle} />

                    <View
                      style={{
                        alignItems: 'flex-start',
                        justifyContent: 'flex-start',
                      }}>
                      <Text style={titleStyle}>{name_en}</Text>
                      <Text style={titleStyle}>
                        {strings.price} {price}
                      </Text>
                      <Text numberOfLines={2} style={{width: hScale(110)}}>
                        {description_en}
                      </Text>
                    </View>

                    <TouchableOpacity
                      style={buttonStyle}
                      onPress={() => this.addItemToCart(item)}>
                      <Text style={{color: colors.white}}>
                        {strings.addToCart}
                      </Text>
                    </TouchableOpacity>
                  </TouchableOpacity>
                );
              }}
            />
            {/* related list */}
            {/* <View style={{height: vScale(150)}}>
              <Text
                style={[
                  relatedItemContainer,
                  isRTL && {alignItems: 'flex-start'},
                ]}>
                {strings.relatedOffers}
              </Text>
              <FlatList
                style={{marginVertical: vScale(15)}}
                contentContainerStyle={{paddingHorizontal: hScale(5)}}
                showsHorizontalScrollIndicator={false}
                data={relatedOffers}
                keyExtractor={(item, index) => index.toString()}
                horizontal
                renderItem={({item, index}) => {
                  const {image} = item;
                  return (
                    <TouchableOpacity
                      style={relatedItemContainer}
                      onPress={() => this.setState({selectedIndex: index})}>
                      <Image source={image} style={relatedItemImageStyle} />
                    </TouchableOpacity>
                  );
                }}
              />
            </View> */}
          </>
        )}
      </ScrollView>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: sWidth,
  },
  bannerContainer: {
    width: '100%',
    height: '25%',
  },
  bannerStyle: {
    width: '100%',
    height: '100%',
    alignSelf: 'center',
  },
  menuContainer: {
    width: '100%',
    marginStart: hScale(10),
    marginTop: 10,
  },
  menuTextStyle: {
    fontSize: fScale(18),
    fontWeight: 'bold',
  },
  itemImageStyle: {
    width: hScale(110),
    height: vScale(80),
    marginHorizontal: hScale(10),
    borderBottomLeftRadius: vScale(15),
    borderBottomRightRadius: vScale(15),
  },
  titleStyle: {
    fontSize: fScale(15),
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: vScale(5),
  },
  menuItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: vScale(10),
  },
  menuImageStyle: {
    width: hScale(110),
    height: vScale(90),
    borderRadius: hScale(10),
    resizeMode: 'cover',
  },
  buttonStyle: {
    width: hScale(100),
    height: vScale(40),
    backgroundColor: 'orange',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: hScale(30),
  },
  menuListStyle: {
    marginTop: vScale(5),
    width: sWidth,
  },
  relatedItemContainer: {
    fontSize: fScale(18),
    fontWeight: '700',
    marginStart: hScale(10),
    marginTop: vScale(10),
  },
  relatedItemImageStyle: {
    width: hScale(180),
    height: vScale(80),
    marginHorizontal: hScale(10),
    borderRadius: hScale(15),
  },
});

const mapStateToProps = ({cartReducer}) => {
  const {cart, categories, subCategory} = cartReducer;

  return {cart, categories, subCategory};
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      addToCart,
      removeFromCart,
      fetchCategories,
      getMenu,
      getExtras,
      get_product,
    },
    dispatch,
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Menu);
