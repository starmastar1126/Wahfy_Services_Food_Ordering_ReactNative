import React, {Component} from 'react';
import {View, Text, FlatList, TouchableOpacity, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {colors} from '../constants';
import {hScale, vScale, fScale} from 'step-scale';
import strings from '../strings';
import {connect} from 'react-redux';
import {logout} from '../redux/actions/AuthActions';
import {bindActionCreators} from 'redux';
import {SafeAreaView} from 'react-navigation'

class SideMenu extends Component {
  async logout() {
    const {navigation} = this.props;
    this.props.logout({navigation});
  }
  render() {
    const {itemContainer, screenNameText} = styles;
    const drawerData = [
      {
        screenName: strings.home,
        screenIcon: 'home',
        onPress: navigation => navigation.navigate('Home'),
      },
      {
        screenName: strings.menu,
        screenIcon: 'home',
        onPress: navigation => navigation.navigate('Menu'),
      },
      {
        screenName: strings.offers,
        screenIcon: 'tag',
        onPress: navigation => navigation.navigate('Offers'),
      },
      {
        screenName: strings.branches,
        screenIcon: 'globe',
        onPress: navigation => navigation.navigate('Branches'),
      },
      {
        screenName: strings.myAddresses,
        screenIcon: 'globe',
        onPress: navigation => navigation.navigate('MyAddresses'),
      },
      {
        screenName: strings.languages,
        screenIcon: 'globe',
        onPress: navigation => navigation.navigate('LanguageSwitcher'),
      },
      {
        screenName: 'Profile',
        screenIcon: 'globe',
        onPress: navigation => navigation.navigate('Profile'),
      },
      {
        screenName: strings.logout,
        screenIcon: 'arrow-left',
        onPress: () => this.logout(),
      },
    ];
    const {navigation} = this.props;
    
    return (
      <SafeAreaView style={{flex:1}}>
      <FlatList
        style={{backgroundColor: 'rgba(81, 90, 90,0.7)'}}
        data={drawerData}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item}) => {
          const {screenName, screenIcon, onPress} = item;
          return (
            <TouchableOpacity
              style={itemContainer}
              onPress={() => {
                onPress(navigation);
                navigation.closeDrawer();
              }}>
              <Icon name={screenIcon} size={fScale(20)} color={colors.white} />
              <Text style={screenNameText}>{screenName}</Text>
            </TouchableOpacity>
          );
        }}
      />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  itemContainer: {
    width: hScale(200),
    height: vScale(50),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginStart: hScale(30),
    alignSelf: 'center',
  },
  screenNameText: {
    fontSize: fScale(17),
    color: colors.white,
    marginStart: hScale(20),
  },
});

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      logout,
    },
    dispatch,
  );
};

export default connect(null, mapDispatchToProps)(SideMenu);
