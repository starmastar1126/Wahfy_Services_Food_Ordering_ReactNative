import React, { Component } from 'react';
import {
    View, Text, StyleSheet, ScrollView,
    Image, TouchableOpacity, TextInput, ActivityIndicator, Modal
} from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Input, Button } from '../components';
import { hScale, sWidth, vScale } from 'step-scale';
import { colors } from '../constants';
import strings from '../strings';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { connect } from 'react-redux';
import { base_URL } from '../services/API';
//import ImagePicker from 'react-native-image-picker';
//import ImagePicker from 'react-native-image-crop-picker';

class EditProfile extends Component {
    state = {
        email: this.props.getUser.email,
        displayName: this.props.getUser.first_name
            + " " + this.props.getUser.last_name,
        first_phone: this.props.getUser.first_phone,
        password: '',
        error: '',
        photoURL: 'https://i.postimg.cc/Wh8rJTYg/camera.png'
    }
    clickPhoto = () => {
        // ImagePicker.openPicker({
        //     width: 300,
        //     height: 400,
        //     cropping: true
        // }).then(image => {
        //     console.log(image);
        // });
        //OOOOOOOOOOOOOOOOOOOOORRRRRRRRRRRRRRRR
        //     ImagePicker.showImagePicker({ title: 'Select Avatar' }, (response) => {
        //         console.log('Response = ', response);

        //         if (response.didCancel) {
        //             console.log('User cancelled image picker');
        //         } else if (response.error) {
        //             console.log('ImagePicker Error: ', response.error);
        //         } else if (response.customButton) {
        //             console.log('User tapped custom button: ', response.customButton);
        //         } else {
        //             this.setState({ photoURL: response.uri });
        //         }
        //     })
    }
    clickSubmit = async () => {
        const { email,
            displayName,
            first_phone, password,
            photoURL } = this.state
        const { navigation } = this.props
        const validation = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!displayName || !displayName.trim()) {
            this.setState({ error: 'Please enter name.' });
        }
        else if (first_phone.length < 10) {
            this.setState({ error: 'Please enter at least 10 numbers.' });
        }
        else if (password.length < 6 || !password.trim()) {
            this.setState({ error: 'Please enter at least 6 characters.' });
        }
        else if (!validation.test(email)) {
            this.setState({ error: 'The email address is badly formatted.' });
        }
        else {
            const { token } = this.props.user.data;
            const fullName = `${displayName}`.split(' ')
            const data = {
                method: 'PUT',
                headers: {
                    Authorization: token ? `Bearer ${token}` : '',
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email,
                    password,
                    first_name:fullName[0],
                    last_name:fullName[1],
                    first_phone,
                    image:photoURL

                   })
            };
            const userResult = await fetch(`${base_URL}auth/user`, data);
            await userResult.json().then(res => {
                console.log(res);
                navigation.navigate('Profile')
            });
        }
    }
    render() {
        const { photoURL, error,
            email, displayName,
            first_phone, password } = this.state
        const { getUser } = this.props
        return (
            getUser ? getUser && <KeyboardAwareScrollView behavior="padding">
                <View style={styles.container}>
                    <TouchableOpacity onPress={this.clickPhoto}>
                        <Image source={{ uri: photoURL }}
                            style={styles.image} />
                    </TouchableOpacity>
                    {error ? <Text style={styles.error}>{error}</Text> : null}
                    <View style={{ marginTop: hp('1%') }} />
                    <View style={styles.form_view}>
                        <Icon style={styles.Icon} name="account" />
                        <TextInput
                            style={styles.input}
                            onChangeText={(displayName) => { this.setState({ displayName, error: '' }) }}
                            underlineColorAndroid="transparent"
                            value={displayName}
                        />
                    </View>
                    <View style={styles.form_view}>
                        <Icon style={styles.Icon} name="phone" />
                        <TextInput
                            style={styles.input}
                            keyboardType='numeric'
                            onChangeText={(first_phone) => { this.setState({ first_phone, error: '' }) }}
                            underlineColorAndroid="transparent"
                            value={first_phone}
                        />
                    </View>
                    <View style={styles.form_view}>
                        <Icon style={styles.Icon} name="lock" />
                        <TextInput
                            style={styles.input} secureTextEntry
                            onChangeText={(password) => { this.setState({ password, error: '' }) }}
                            underlineColorAndroid="transparent"
                            value={password}
                        />
                    </View>
                    <View style={styles.form_view}>
                        <Icon style={styles.Icon} name="email" />
                        <TextInput
                            style={styles.input}
                            keyboardType='email-address'
                            onChangeText={(email) => { this.setState({ email, error: '' }) }}
                            underlineColorAndroid="transparent"
                            value={email}
                        />
                    </View>
                </View>
                <Button title={strings.save}
                    buttonStyle={styles.buttonStyle}
                    onPress={this.clickSubmit} />
            </KeyboardAwareScrollView>
                : null
        );
    }
}
const styles = StyleSheet.create({
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
export default connect(mapStateToProps)(EditProfile);

