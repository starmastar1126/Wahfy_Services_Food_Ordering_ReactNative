import React, { Component } from 'react';
import {
    View, Text, StyleSheet,
    TouchableOpacity, TextInput, ActivityIndicator
} from 'react-native'
import {heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Button } from '../components';
import { hScale, vScale } from 'step-scale';
import strings from '../strings';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { connect } from 'react-redux';
import { base_URL } from '../services/API';

export default class resetpassword extends Component {
    async componentDidMount() {
        const { navigation } = this.props
        const code = this.props.navigation.getParam('CodeParam')
        const data = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        };
        const userResult = await fetch(`${base_URL}auth/password/find/${code}`, data);
        await userResult.json().then(res => {
            console.log(res);
            if (res.message == "This password reset token is invalid.") {
                navigation.navigate({
                    routeName: 'PhoneV',
                    params: {
                        ErrorParam: "OTP code is invaild"
                    }
                })
            }
        });
    }
    state = {
        password: '',
        error: '',
    }
    resetPasswordClick = async () => {
        const { password } = this.state
        const { navigation } = this.props
        const code = this.props.navigation.getParam('CodeParam')
        const email = this.props.navigation.getParam('EmailForgetParam')

        if (password.length < 6 || !password.trim()) {
            this.setState({ error: 'Please enter at least 6 characters.' });
        }
        else {
            const data = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email,
                    password,
                    token: code
                })
            };
            const userResult = await fetch(`${base_URL}auth/password/reset`, data);
            await userResult.json().then(res => {
                console.log(res);
                if (res.success == true) {
                    navigation.navigate('Login')
                }
                // else {
                   // navigation.navigate('Login')
                //}
            });
        }
    }
    render() {
        const { error, password } = this.state
        return (
            <KeyboardAwareScrollView behavior="padding">
                <View style={styles.container}>
                    {error ? <Text style={styles.error}>{error}</Text> : null}
                    <View style={{ marginTop: hp('1%') }} />
                    <View style={styles.form_view}>
                        <Icon style={styles.Icon} name="lock" />
                        <TextInput
                            style={styles.input} secureTextEntry
                            onChangeText={(password) => { this.setState({ password, error: '' }) }}
                            underlineColorAndroid="transparent"
                            value={password}
                        />
                    </View>
                </View>
                <Button title={strings.backToLogin}
                    buttonStyle={styles.buttonStyle}
                    onPress={this.resetPasswordClick} />
            </KeyboardAwareScrollView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        alignItems: 'center',
        paddingTop: hp('8%'),
        flex: 1
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
