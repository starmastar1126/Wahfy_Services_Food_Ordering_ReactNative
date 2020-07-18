import React, {Component} from 'react';
import {View, Text, FlatList} from 'react-native';

export class MyOrders extends Component {
  state = {
    orders: []
  }
  render() {
    const { orders } = this.state
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Text style={{fontSize: 20, fontWeight: 'bold'}}>No orders</Text>
      </View>
    );
  }
}
