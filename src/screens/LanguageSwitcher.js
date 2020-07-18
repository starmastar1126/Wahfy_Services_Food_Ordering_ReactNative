import React, { Component } from "react";
import {
  View,
  FlatList,
  Text,
  TouchableOpacity,
  StyleSheet
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { fScale, hScale, vScale, sWidth, crScale } from "step-scale";
import strings from "../strings";
import { languageSwitcher } from "../helpers/Language";

export class LangSwitcher extends Component {
  state = { langSelectionID: null };

  static navigationOptions = () => ({
    title: strings.languages
  });

  async componentDidMount() {
    const langCode = await languageSwitcher.getCurrentLanguageCode();
    await languageSwitcher.switchTo(langCode);
    this.setState({ langSelectionID: langCode });
  }

  render() {
    const {
      container,
      checkContainer,
      headViewStyle,
      headContainer,
      headTextStyle
    } = styles;
    const { langSelectionID } = this.state;
    return (
      <View style={{flex:1}}>
        <View style={headContainer}>
          <Text style={ headTextStyle}>
            {/* {strings.langSetting} */}
          </Text>
        </View>
        <FlatList
          data={_data}
          keyExtractor={(item, index) => index.toString()}
          extraData={this.state}
          renderItem={({ item }) => {
            const { langType, id } = item;
            const isSelected = langSelectionID == id;
            return (
              <TouchableOpacity
                disabled={isSelected}
                style={container}
                onPress={() =>
                  this.setState(
                    { langSelectionID: id },
                    async () => await languageSwitcher.switchTo(id)
                  )
                }
              >
                <View
                  style={[
                    checkContainer,
                    isSelected && { backgroundColor: 'orange'}
                  ]}
                >
                  {isSelected && (
                    <Icon name="check" color={'orange'} size={fScale(20)} />
                  )}
                </View>
                <Text>{langType}</Text>
              </TouchableOpacity>
            );
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: hScale(332),
    height: vScale(49),
    borderWidth: hScale(1),
    borderColor: 'gray',
    flexDirection: "row",
    alignItems: "center",
    marginVertical: vScale(5),
    alignSelf: "center"
  },
  checkContainer: {
    ...crScale(25.7),
    borderWidth: hScale(1),
    borderColor: 'gray',
    marginHorizontal: hScale(29.2)
  },
  headViewStyle: {
    width: sWidth,
    height: vScale(19),
    backgroundColor: 'gray'
  },
  headContainer: {
    width: hScale(375),
    height: hScale(40),
    alignItems: "flex-start",
    justifyContent: "center",
    marginTop: vScale(5)
  },
  headTextStyle: {
    color: 'gray',
    start: hScale(18)
  }
});

const _data = [
  { id: "ar", langType: strings.arLang },
  { id: "en", langType: strings.enLang }
];
