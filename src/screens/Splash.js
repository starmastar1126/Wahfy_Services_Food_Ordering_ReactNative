import React, { Component } from 'react'
import { StyleSheet, Image, View, Alert, BackHandler } from 'react-native'
import { images } from '../assets';
import strings from '../strings';

export default class Splash extends Component {
    componentWillMount() {
        setTimeout(() => {
            this.props.navigation.navigate('Intro')
        }, 3000)
        // BackHandler.addEventListener('hardwareBackPress', this.backPressed);
    }

    // componentWillUnmount() {
    //     BackHandler.removeEventListener('hardwareBackPress', this.backPressed);
    // }

    // backPressed = () => {
    //     Alert.alert(
    //         strings.exitApp,
    //         strings.exit,
    //         [
    //             { text: strings.no, onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
    //             { text: strings.yes, onPress: () => BackHandler.exitApp() },
    //         ],
    //         { cancelable: true });
    //     return true;
    // }
    render() {
        return (
            <View>
                <Image source={images.food} style={styles.imageStyle} />
                <Image source={images.splash} resizeMode='stretch' style={styles.imageStyle2} />
            </View>


        )
    }
}

const styles = StyleSheet.create({
    imageStyle: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    imageStyle2: {
        marginTop: '45%',
        width: '40%',
        height: '10%',
        position: 'absolute',
        alignSelf: 'center'
    },
})
