import React, {Component} from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import {Input, Button} from '../components/common';
import {colors} from '../constants';
import strings from '../strings';
import {Dropdown} from 'react-native-material-dropdown';

class EditAddress extends Component {
  state = {
    addressName: '',
    house: '',
    locality: '',
    landmark: '',
  };

  static navigationOptions = ({navigation}) => ({
    headerStyle: {backgroundColor: 'orange'},
    headerRight: (
      <TouchableOpacity
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          marginEnd: 10,
        }}
        onPress={() => navigation.navigate('Home')}>
        <Icon name="home" size={8} color={colors.white} size={35}/>
      </TouchableOpacity>
    ),
    headerTintColor: colors.white,
    headerTitle: strings.editAddress,
  });


  render() {
    const {addressName, house, locality, landmark} = this.state;
    const {
      headLineStyle,
      inputStyle,
      collapseContainer,
      buttonStyle,
      enterDetailsText,
    } = styles;
    return (
      <ScrollView contentContainerStyle={{marginTop: 50, flex: 1}}>
        <View style={{flex: 1}}>
          <Text style={enterDetailsText}>{strings.editDetails}</Text>
          <View style={headLineStyle} />
          <Input
            containerStyle={inputStyle}
            placeholder={strings.addressName}
            placeholderTextColor={'gray'}
            inputStyle={{fontSize: 15, marginStart: 0, width: '95%'}}
            value={addressName}
            onChangeText={addressName => this.setState({addressName})}
          />
          <Input
            containerStyle={inputStyle}
            placeholder={strings.house}
            placeholderTextColor={'gray'}
            inputStyle={{fontSize: 15, marginStart: 0}}
            value={house}
            onChangeText={house => this.setState({house})}
          />
          <Input
            containerStyle={inputStyle}
            placeholder={strings.locality}
            placeholderTextColor={'gray'}
            inputStyle={{fontSize: 15, marginStart: 0}}
            value={locality}
            onChangeText={locality => this.setState({locality})}
          />
          <Input
            containerStyle={inputStyle}
            placeholder={strings.landmark}
            placeholderTextColor={'gray'}
            inputStyle={{fontSize: 15, marginStart: 0}}
            value={landmark}
            onChangeText={landmark => this.setState({landmark})}
          />
          <Dropdown
            label="City"
            data={cityData}
            containerStyle={collapseContainer}
          />
          <Dropdown
            label="Area"
            data={areaData}
            containerStyle={[collapseContainer, {marginTop: 8}]}
          />

          <Button title={strings.saveAddress} buttonStyle={buttonStyle} />
        </View>
      </ScrollView>
    );
  }
}

const cityData = [
  {value: 'cairo'},
  {value: 'alex'},
  {value: 'sohag'},
  {value: 'sharm'},
];

const areaData = [
  {value: 'AinShams'},
  {value: 'Helwan'},
  {value: 'Salah Salem'},
];

const styles = StyleSheet.create({
  enterDetailsText: {
    fontSize: 30,
    color: colors.buttonBG,
    marginStart: 15,
  },
  headLineStyle: {
    width: '100%',
    height: 1,
    backgroundColor: 'orange',
    marginVertical: 10,
  },
  inputStyle: {
    width: '95%',
    borderBottomWidth: 1,
    borderColor: '#e3e3e1',
    borderWidth: 0,
    borderRadius: 0,
    backgroundColor: colors.white,
    paddingHorizontal: 0,
  },
  collapseContainer: {
    width: '95%',
    alignSelf: 'center',
    borderBottomColor: 'gray',
    marginTop: -15,
  },
  cityText: {
    fontSize: 15,
    color: 'gray',
    marginBottom: 10,
  },
  buttonStyle: {
    width: '75%',
    borderRadius: 5,
    marginTop: 50,
    position: 'absolute',
    bottom: 60,
  },
});

export default EditAddress;
