import React,{Component} from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import strings from '../strings';
import { colors } from '../constants/color';

// export default class OfferCard extends Component {
//   render() {
//     const { item } = this.props;
//     const { id, image, title, price, description, type } = item;
//     const {
//       container,
//       subContainer,
//       menuImageStyle,
//       titleStyle,
//       typeText,
//     } = styles;

//     return (
//       <TouchableOpacity
//         key={id}
//         style={container}
//         >
//         <Image source={{uri:image}} style={menuImageStyle} />
//         <View style={subContainer}>
//           <Text style={titleStyle}>{title}</Text>
//           {price?<Text
//             style={[
//               titleStyle,
//               {
//                 fontSize: 13,
//                 marginVertical: 5,
//                 fontWeight: '600',
//                 color: '#9c9c9c',
//               },
//             ]}>
//             {strings.price} {price}
//           </Text>:null}
//           <Text
//             numberOfLines={2}
//             style={{ width: 200, fontSize: 12, color: '#b0b0b0' }}>
//             {description}
//           </Text>
//           <Text style={typeText}>{type}</Text>
//         </View>
//         <View></View>
//       </TouchableOpacity>
//     );
//   }
// }

export const OfferCard = props => {
  const {item, onPress} = props;
  const {id, image, title, price, description, type} = item;

  const {
    container,
    subContainer,
    menuImageStyle,
    titleStyle,
    typeText,
  } = styles;

  return (
    <TouchableOpacity
      key={id}
      style={container}
      onPress={onPress}>
      <Image source={{uri:image}} style={menuImageStyle} />
      <View style={subContainer}>
        <Text style={titleStyle}>{title}</Text>
        <Text
          style={[
            titleStyle,
            {
              fontSize: 13,
              marginVertical: 5,
              fontWeight: '600',
              color: '#9c9c9c',
            },
          ]}>
          {strings.price} {price}
        </Text>
        <Text
          numberOfLines={2}
          style={{width: 200, fontSize: 12, color: '#b0b0b0'}}>
          {description}
        </Text>
        <Text style={typeText}>{type}</Text>
      </View>
      <View></View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '95%',
    height: 130,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    borderWidth: 0.5,
    borderColor: '#cfcfcf',
    borderRadius: 10,
    alignSelf: 'center',
  },
  subContainer: {
    alignItems: 'flex-start',
    alignSelf: 'flex-start',
    marginStart: 20,
  },
  menuImageStyle: {
    width: 110,
    height: 130,
    borderRadius: 10,
  },
  titleStyle: {
    fontSize: 15,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 5,
  },
  typeText: {
    fontSize: 15,
    textAlign: 'center',
    marginTop: 20,
    color: colors.buttonBG,
  },
});
