import React, { Component } from 'react';
import {
  View, StyleSheet,
  Image, TextInput, ActivityIndicator
} from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Button } from '../components';
import { hScale, sWidth, vScale } from 'step-scale';
import { colors } from '../constants';
import strings from '../strings';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { connect } from 'react-redux';
import { base_URL } from '../services/API';
import { getUserData } from '../redux/actions';

class Profile extends Component {
  state = {
    email: '',
    displayName: '',
    phone: '',
    password: '',
    loading: true,
    error: '',
    photoURL: 'https://i.postimg.cc/Wh8rJTYg/camera.png',
    getUser: null,
  }
  async componentDidMount() {
    //console.log(this.props.user.data.token);
    const { token } = this.props.user.data;
    const data = {
      method: 'GET',
      headers: {
        Authorization: token ? `Bearer ${token}` : '',
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    };
    const userResult = await fetch(`${base_URL}auth/user`, data);
    await userResult.json().then(res => {
      this.setState({ loading: false })
      this.props.getUserData(res.data);
    });
  }

  render() {
    const { loading, photoURL} = this.state
    const { getUser,navigation } = this.props
    if (loading) {
      return (
        <ActivityIndicator size='large'
          style={styles.ActivityIndicato} color={colors.buttonBG} />
      )
    }
    return (
      getUser ? getUser && <KeyboardAwareScrollView behavior="padding">
        <View style={styles.container}>
          <Image source={{ uri: photoURL }}
            style={styles.image} />
          <View style={{ marginTop: hp('1%') }} />
          <View style={styles.form_view}>
            <Icon style={styles.Icon} name="account" />
            <TextInput
              editable={false}
              style={styles.input}
              placeholder={getUser.first_name+" "+getUser.last_name} placeholderTextColor="#000"
              underlineColorAndroid="transparent"
            />
          </View>
          <View style={styles.form_view}>
            <Icon style={styles.Icon} name="phone" />
            <TextInput
              editable={false}
              style={styles.input}
              keyboardType='numeric'
              placeholder={getUser.first_phone} placeholderTextColor="#000"
              underlineColorAndroid="transparent"
            />
          </View>
          <View style={styles.form_view}>
            <Icon style={styles.Icon} name="email" />
            <TextInput
              editable={false}
              style={styles.input}
              keyboardType='email-address'
              placeholder={getUser.email} 
              placeholderTextColor="#000"
              underlineColorAndroid="transparent"
            />
          </View>
        </View>
        <Button title={strings.editProfile}
          buttonStyle={styles.buttonStyle}
          onPress={() => navigation.navigate('EditProfile')} />
      </KeyboardAwareScrollView>
        : null
    );
  }
}
const styles = StyleSheet.create({
  ActivityIndicato: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1
  },
  container: {
    backgroundColor: '#fff',
    alignItems: 'center',
    paddingTop: hp('8%'),
    flex: 1
  },
  image: {
    width: hp('20%'),
    height: hp('20%'),
    borderRadius: hp('10'),
    resizeMode: 'cover'
  },
  image2: {
    width: hp('10%'),
    height: hp('10%'),
    borderRadius: hp('5'),
    resizeMode: 'cover'
  },
  form_view: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    marginLeft: hp('2%'),
    marginRight: hp('2%'),
    borderRadius: 10,
    width: '90%',
    borderBottomColor: 'grey',
    borderBottomWidth: 2
  },
  form_view2: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    marginLeft: hp('2%'),
    marginRight: hp('2%'),
    borderRadius: 10,
    width: '90%',
    margin: hp('0.1%')
  },
  Icon: {
    padding: hp('1%'),
    fontSize: hp('6%'),
    color: 'orange'
  },
  input: {
    flex: 1,
    paddingTop: hp('1%'),
    paddingRight: hp('1%'),
    paddingBottom: hp('1%'),
    paddingLeft: hp('0%'),
    backgroundColor: '#fff',
    color: '#000',
    fontSize: hp('2%'),
    textAlign:'left'
  },
  error: {
    color: 'red',
    fontSize: hp('2%'),
    textAlign: 'center',
    padding: hp('0.5%')
  },
  buttonStyle: {
    width: '40%',
    borderRadius: hScale(10),
    marginTop: vScale(20),
  },
})
const mapStateToProps = (state) => ({
  user: state.authReducer.user,
  getUser: state.getuserdataReducer.info
});
export default connect(mapStateToProps, { getUserData }
)(Profile);

