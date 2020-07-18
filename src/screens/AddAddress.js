import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { Input, Button } from '../components/common';
import { colors } from '../constants';
import strings from '../strings';
import { Dropdown } from 'react-native-material-dropdown';
import Icon from 'react-native-vector-icons/FontAwesome';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { newAddress } from '../redux/actions';
import { base_URL } from '../services/API';
import RNPickerSelect from 'react-native-picker-select';//here

class AddAddress extends Component {
  state = {
    name: '',
    street: '',
    floorNumber: '',
    buildingNumber: '',
    landmark: '',
    cities: [],
    city_Id: 1,
    areas: [],
    area_Id: "10700001001",
    error: '',
    buttonLoading: false,
  };

  static navigationOptions = ({ navigation }) => ({
    headerStyle: { backgroundColor: 'orange' },
    headerRight: (
      <TouchableOpacity
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          marginEnd: 10,
        }}
        onPress={() => navigation.navigate('Home')}>
        <Icon name="home" color={colors.white} size={35} />
      </TouchableOpacity>
    ),
    headerTintColor: colors.white,
    headerTitle: strings.addAddress,
  });

  componentDidMount() {
    this.getCitiesAndAreas();
  }

  async getCitiesAndAreas() {
    console.log(this.props.user);
    
    const { token } = this.props.user.data;
    const data = {
      method: 'GET',
      headers: {
        Authorization: token ? `Bearer ${token}` : '',
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    };
    const citiesResult = await fetch(`${base_URL}cities`, data);
    const cities = await citiesResult.json();

    const cityId = cities.data[0].id;
    const areasResult = await fetch(`${base_URL}cities/${cityId}/areas`, data);
    const areas = await areasResult.json();
    this.setState({ cities: cities.data, areas });
  }

  validateAddressInputs(
    nameError,
    streetError,
    floorNoError,
    buildingNoError,
    landmarkError,
  ) {
    if (nameError) {
      this.setState({ error: 'name' });
    } else if (streetError) {
      this.setState({ error: 'street' });
    } else if (floorNoError) {
      this.setState({ error: 'floor' });
    } else if (buildingNoError) {
      this.setState({ error: 'building' });
    } else if (landmarkError) {
      this.setState({ error: 'landmark' });
    } else this.createAddress();
  }

  createAddress() {
    const { token } = this.props.user.data;
    const {
      name,
      street,
      buildingNumber,
      floorNumber,
      landmark,
      cities,
      areas,
      city_Id,
      area_Id
    } = this.state;
    const { navigation } = this.props;
    // const cityId = cities.forEach(city => {
    //   return city.id;
    // });
    // const areaId = areas.forEach(area => {
    //   return area.id;
    // });

    this.setState({ buttonLoading: true });

    this.props.newAddress({
      name,
      street,
      building_number: buildingNumber,
      floor_number: floorNumber,
      landmark,
      city_id: city_Id,
      area_id: area_Id ,
      navigation,
      token,
    });
    this.setState({ buttonLoading: false });
  }
  render() {
    const {
      name,
      street,
      floorNumber,
      buildingNumber,
      landmark,
      error,
      cities,
      city_Id,
      areas,
      area_Id,
      buttonLoading,
    } = this.state;

    const {
      headLineStyle,
      inputStyle,
      collapseContainer,
      buttonStyle,
      enterDetailsText,
    } = styles;

    const {
      nameErrorText,
      streetErrorText,
      floorNoErrorText,
      buildingNoErrorText,
      landMarkErrorText,
    } = strings.errorMessages;

    const streetError = street.length == 0;//address name
    const isStreetError = error === 'street';

    const nameError = name.length == 0;//street
    const isNameError = error === 'name';

    const floorNoError = floorNumber.length == 0;
    const isFloorNoError = error === 'floor';

    const buildingNoError = buildingNumber.length == 0;
    const isBuildingNoError = error === 'building';

    const landmarkError = landmark.length == 0;
    const isLandmarkError = error === 'landmark';

    const CitiesDropDownData = cities.map(city => ({
      //value: city.name_en,
      label: city.name_en,
      value: city.id
    }));

    const AreasDropDownData = areas.map(area => ({
      label:area.name_en,
      value: `${area.id}`,
    }));

    // const cityId = cities[0].find(city => {
    //   return city.id;
    // });
    // console.log('cityId', cityId)

    return (
      <ScrollView contentContainerStyle={{ marginTop: 15, flex: 1 }}>
        <View style={{ flex: 1 }}>
          <Text style={enterDetailsText}>{strings.enterDetails}</Text>
          <View style={headLineStyle} />
          <Input
            containerStyle={inputStyle}
            placeholder={strings.addressName}
            placeholderTextColor={'gray'}
            inputStyle={{ fontSize: 15, marginStart: 0 }}
            value={street}
            onChangeText={street => this.setState({ street, error: '' })}
            errorMessage={isStreetError && streetErrorText}
          />
          {/* <Dropdown
            label={`${strings.city}`}
            data={CitiesDropDownData}
            containerStyle={collapseContainer}
          /> */}
          <RNPickerSelect
            style={{
              inputAndroid: {
                width: '95%',
                borderColor: '#e3e3e1',
                borderWidth: 1,
                borderRadius: 0,
                fontSize: 15, 
                margin: '2.5%',
                marginTop:'0%',
                paddingLeft:'3%',
                backgroundColor: colors.white,
                paddingHorizontal: 0,
              }
            }}
            placeholder={{ label: `${strings.city}`, value: 1, color: 'grey' }}
            placeholderTextColor='grey'
            onValueChange={city_Id => this.setState({
              city_Id
            })}
            items={CitiesDropDownData}
            value={city_Id}
            useNativeAndroidPickerStyle={false}
          />
          {/* <Dropdown
            label={`${strings.area}`}
            data={AreasDropDownData}
            containerStyle={[collapseContainer, { marginTop: 8 }]}
          /> */}
          <RNPickerSelect
            style={{
              inputAndroid: {
                width: '95%',
                borderColor: '#e3e3e1',
                borderWidth: 1,
                borderRadius: 0,
                fontSize: 15, 
                margin: '2.5%',
                marginTop:'0%',
                marginBottom:'0%',
                paddingLeft:'3%',
                backgroundColor: colors.white,
                paddingHorizontal: 0,
              }
            }}
            placeholder={{ label: `${strings.area}`, value: "10700001001", color: 'grey' }}
            placeholderTextColor='grey'
            onValueChange={area_Id => this.setState({
              area_Id
            })}
            items={AreasDropDownData}
            value={area_Id}
            useNativeAndroidPickerStyle={false}
          />
          <View style={{ paddingTop: '5%' }} />
          <Input
            containerStyle={inputStyle}
            placeholder={strings.name}
            placeholderTextColor={'gray'}
            inputStyle={{ fontSize: 15, marginStart: 0, width: '95%' }}
            value={name}
            onChangeText={name => this.setState({ name, error: '' })}
            errorMessage={isNameError && nameErrorText}
          />
          <Input
            containerStyle={inputStyle}
            placeholder={strings.buildingNo}
            placeholderTextColor={'gray'}
            inputStyle={{ fontSize: 15, marginStart: 0 }}
            value={buildingNumber}
            onChangeText={buildingNumber =>
              this.setState({ buildingNumber, error: '' })
            }
            keyboardType="number-pad"
            errorMessage={isBuildingNoError && buildingNoErrorText}
          />
          <Input
            containerStyle={inputStyle}
            placeholder={strings.floor}
            placeholderTextColor={'gray'}
            inputStyle={{ fontSize: 15, marginStart: 0 }}
            value={floorNumber}
            onChangeText={floorNumber =>
              this.setState({ floorNumber, error: '' })
            }
            keyboardType="number-pad"
            errorMessage={isFloorNoError && floorNoErrorText}
          />
          <Input
            containerStyle={inputStyle}
            placeholder={strings.landmark}
            placeholderTextColor={'gray'}
            inputStyle={{ fontSize: 15, marginStart: 0 }}
            value={landmark}
            onChangeText={landmark => this.setState({ landmark, error: '' })}
            errorMessage={isLandmarkError && landMarkErrorText}
          />

          <Button
            title={strings.saveAddress}
            loading={buttonLoading}
            buttonStyle={buttonStyle}
            onPress={() =>
              this.validateAddressInputs(
                nameError,
                streetError,
                floorNoError,
                buildingNoError,
                landmarkError,
              )
            }
          />
        </View>
      </ScrollView>
    );
  }
}

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

const mapStateToProps = ({ authReducer }) => {
  const { user } = authReducer;
  return { user };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      newAddress,
    },
    dispatch,
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(AddAddress);
