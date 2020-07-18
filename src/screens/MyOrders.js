import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import strings from '../strings';

class ListView extends Component {
  render() {
    const { item, index, navigation } = this.props
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate({
          routeName: 'OrderDetails',
          params: {
            OrderNameParam: item.name
          }
        })
        }
        style={styles.touchableOpacity}>
        <View style={{ flexDirection: 'row' }}>
          <Text style={{ fontSize: hp('3%'), fontWeight: 'bold' }}>Order No: </Text>
          <View style={{ width: wp('5%') }} />
          <Text style={{ fontSize: hp('3%') }}>{index + 1}</Text>
          <TouchableOpacity 
          onPress={()=>this.props.DELETEITEM(item.key)}
          style={{ backgroundColor: '#00a8ff', borderRadius: 5, position: 'absolute', right: wp('3%') }}>
            <Text style={{ fontSize: hp('2.5%'), padding: hp('1%'), color: '#fff', fontWeight: '900' }}>
              Delete
            </Text>
          </TouchableOpacity>
        </View>
        <View style={{ flexDirection: 'row' }}>
          <Text style={{ fontSize: hp('2.5%') }}>Date: </Text>
          <View style={{ width: wp('5%') }} />
          <Text style={{ fontSize: hp('2.5%'), color: 'grey', fontWeight: 'bold' }}>8:30 am Jan 3,2015</Text>
        </View>
        <View style={{ flexDirection: 'row' }}>
          <Text style={{ fontSize: hp('2.5%') }}>Order Status: </Text>
          <View style={{ width: wp('5%') }} />
          <Text style={{ fontSize: hp('2.5%') }}>Delivered</Text>
        </View>
        <View style={{ flexDirection: 'row' }}>
          <Text style={{ fontSize: hp('2.5%'), color: 'grey', fontWeight: 'bold' }}>Total: </Text>
          <View style={{ flexDirection: 'row', position: 'absolute', right: wp('3%') }}>
            <Text style={{ fontSize: hp('2.5%'), color: 'grey', fontWeight: 'bold' }}>6 ITEMS</Text>
            <View style={{ width: wp('5%') }} />
            <Text style={{ fontSize: hp('2.5%'), fontWeight: 'bold' }}>20 SR</Text>
          </View>
        </View>
      </TouchableOpacity>
    )
  }
}
export class MyOrders extends Component {
  state = {
    orders: [{
      name: 'ahmed', key: 1
    },
    {
      name: 'khald', key: 2
    },
    {
      name: 'manal', key: 3
    },
    {
      name: 'qamar', key: 4
    },
    {
      name: 'doctor', key: 5
    },
    {
      name: 'mohamed', key: 6
    }]
  }
  deleteItem=key => {
    const filteredData = this.state.orders.filter(item => item.key !== key);
    this.setState({ orders: filteredData });
  }
  render() {
    const { orders } = this.state
    const { navigation } = this.props
    console.log(orders.length);
    
    return (
      <View style={styles.container}>
        {orders.length === 0 ?
          <View style={styles.container3}>
            <Text style={styles.text3}>
              {strings.emptyOrders}
          </Text>
          </View>
          :
          <View style={{ flex: 1 }}>

            <View style={styles.container2}>
              <Text style={styles.text}>ORDER HISTORY</Text>
              <View style={{ width: wp('20%') }} />
              <Text style={styles.text2}>YOUR ORDER</Text>
            </View>
            <FlatList
              data={orders}
              keyExtractor={(item) => item.key.toString()}
              renderItem={({ item, index }) => (
                <ListView
                  item={item}
                  index={index}
                  navigation={navigation} 
                  DELETEITEM={()=>this.deleteItem(item.key)}/>
              )}
            />
          </View>
        }
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#dfe4ea'
  },
  container2: {
    width: wp('95%'),
    flexDirection: 'row',
    alignSelf: 'center',
    justifyContent: 'center',
  },
  text: {
    color: 'grey',
    fontSize: hp('3%'),
    fontWeight: '500'
  },
  text2: {
    color: 'grey',
    fontSize: hp('3%'),
    fontWeight: '500',
  },
  touchableOpacity: {
    backgroundColor: '#fff',
    margin: hp('1%'),
    padding: hp('1%'),
    borderRadius: 5,
    width: wp('95%'),
    alignSelf: 'center'
  },
  container3: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1
  },
  text3: {
    fontSize: hp('3%'),
    textAlign: 'center'
  }
})
