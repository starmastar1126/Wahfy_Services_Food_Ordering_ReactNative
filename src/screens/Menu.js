import React, { Component } from 'react';
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
  Dimensions,
  BackHandler,
  Alert
} from 'react-native';
import strings from '../strings';
import { images } from '../assets';
import Swiper from 'react-native-swiper';
import ImageSlider from 'react-native-image-slider';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  addToCart,
  removeFromCart,
  fetchCategories,
  getMenu,
  get_product,
  getExtras,
} from '../redux/actions/CartActions';
import { hScale, vScale, fScale, sWidth, crScale } from 'step-scale';
import { colors } from '../constants';
import AsyncStorage from '@react-native-community/async-storage';

const { isRTL } = I18nManager;

class Menu extends Component {
  state = {
    categories: [],
    menuItems: [],
    extras: [],
    screenLoading: true,
    catId: 1,
  };
  componentWillMount() {
    BackHandler.addEventListener('hardwareBackPress', this.backPressed);
 }
 
 componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.backPressed);
 }
 
 backPressed = () => {
   Alert.alert(
     strings.exitApp,
     strings.exit,
     [
       {text: strings.no, onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
       {text: strings.yes, onPress: () => BackHandler.exitApp()},
     ],
     { cancelable: false });
     return true;
 }
  componentDidMount(id) {
    this.getCategories();
    this.getMenuItems(id);
  }

  async getCategories() {
    const token = await AsyncStorage.getItem('@TOKEN');
    this.props.fetchCategories({ token });
  }

  getMenuItems(id) {
    const catId = id || 1;
    this.props.getMenu({ catId });
    this.props.getExtras({ catId });
  }

  handleSelectedProduct(item) {
    this.props.get_product(item);
  }

  addItemToCart(item) {
    this.props.addToCart(item);
  }

  renderCategoryItem = ({ item }) => {
    const { id, image, name_en } = item;
    const { categoryItemContanier, categoryImageView, categoryImage, categoryTitle } = styles;
    return (
      <TouchableOpacity onPress={() => this.getMenuItems(id)}>
        <View style={categoryItemContanier}>
          <View style={categoryImageView}>
            <Image style={categoryImage} source={{ uri: image }} />
          </View>
          <Text style={categoryTitle}>{name_en}</Text>
        </View>
      </TouchableOpacity>
    )
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
    const swiperImages2 = [
      require('../assets/images/slider1.jpg'),
      require('../assets/images/slider2.jpg'),
      require('../assets/images/slider3.jpg'),
    ]
    const {
      container,
      bannerContainer,
      bannerStyle,
      itemContainer,
      menuContainer,
      menuTextStyle,
      titleStyle,
      menuItemContainer,
      buttonStyle,
      menuImageStyle,
      menuListStyle,
      relatedItemContainer,
      relatedItemImageStyle,
      categoriesView
    } = styles;
    const { categories, cart, loading, subCategory } = this.props;
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
            style={{ marginTop: 15 }}
          />
        ) : (
            <>
              <View style={bannerContainer}>
                {/* <Swiper
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
              </Swiper> */}
                <ImageSlider autoPlayWithInterval={3000}
                  images={swiperImages2} />
              </View>

              <FlatList
              style={categoriesView}
                showsHorizontalScrollIndicator={false}
                data={categories[0]}
                keyExtractor={(item, index) => index.toString()}
                horizontal
                renderItem={this.renderCategoryItem}
              />

              <View style={[menuContainer, isRTL && { alignItems: 'flex-start' }]}>
                <Text style={[menuTextStyle]}>{strings.menu}</Text>
              </View>
              {/* menu list */}
              <FlatList
                style={menuListStyle}
                contentContainerStyle={{ paddingHorizontal: hScale(10) }}
                showsVerticalScrollIndicator={false}
                data={subCategory[1]}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => {
                  const { id, image, name_en, price, description_en } = item;
                  return (
                    <TouchableOpacity
                      key={id}
                      style={menuItemContainer}
                      onPress={() => {
                        this.handleSelectedProduct(item);
                        this.props.navigation.navigate('ProductDetails');
                      }}>
                      <Image source={{ uri: image }} style={menuImageStyle} />

                      <View
                        style={{
                          alignItems: 'flex-start',
                          justifyContent: 'flex-start',
                        }}>
                        <Text style={titleStyle}>{name_en}</Text>
                        <Text style={titleStyle}>
                          {strings.price} {price}
                        </Text>
                        <Text numberOfLines={2} style={{ width: hScale(110) }}>
                          {description_en}
                        </Text>
                      </View>

                      <TouchableOpacity
                        style={buttonStyle}
                        onPress={() => this.addItemToCart(item)}>
                        <Text style={{ color: colors.white }}>
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

const { width } = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: sWidth,
  },
  bannerContainer: {
    width,
    height: 250
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
    height: 150,
    width: 100,
    marginLeft: 10
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
    width: hScale(60),
    height: vScale(40),
    backgroundColor: 'orange',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: hScale(10),
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
    borderRadius: hScale(15)
  },
  categoriesView: {
    width,
    marginTop: 10,
    paddingTop: 2,
    borderTopColor: 'gray',
    borderTopWidth: 1
  },
  categoryItemContanier: {
    width: 150,
    marginLeft: 5,
    marginRight: 5,
    justifyContent: 'center',
    alignItems: 'center'
  },
  categoryImageView:{
    height: 90,
    width: 140,
    borderWidth: 1,
    borderColor: "grey",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    justifyContent: 'center',
    alignItems: 'center'
  },
  categoryImage: {
    height: 80,
    width: 120,
    borderRadius: 10
  },
  categoryTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 5
  },
});

const mapStateToProps = ({ cartReducer }) => {
  const { cart, categories, subCategory } = cartReducer;

  return { cart, categories, subCategory };
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
