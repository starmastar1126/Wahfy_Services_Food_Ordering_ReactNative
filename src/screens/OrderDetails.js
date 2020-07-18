import React, { Component } from 'react'
import { Text, StyleSheet, View } from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export default class OrderDetails extends Component {
    render() {
        const name = this.props.navigation.getParam('OrderNameParam')
        return (
            <View style={styles.container}>
                <Text style={styles.text}>{name}</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1
    },
    text: {
        fontSize: hp('3%')
    }
})
