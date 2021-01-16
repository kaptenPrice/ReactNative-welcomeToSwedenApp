import React from "react";
import { Dimensions } from "react-native";
import { StyleSheet } from "react-native";
import { View, Text } from "react-native";
import { AwesomeTextInput } from "react-native-awesome-text-input";
import appColors from "../assets/appColor";

const InputComponent = ({ children, onChangeText }) => {
  const { width, height } = Dimensions.get("screen");
  return (
    <View styles={{ marginTop: 10, paddingTop: 10 }}>
      <Text
        style={{
          marginLeft: 15,
          marginRight: "auto",
          marginBottom: -7,
          backgroundColor: appColors.bgColor,
          color: appColors.lableHeader,
          zIndex: 1000,
        }}
      >
        {children}
      </Text>
      <AwesomeTextInput
        customStyles={{
          container: {
            backgroundColor: appColors.bgColor,
            borderWidth: 1,
            borderColor: "grey",
            borderRadius: 10,
            height: 45,
            width: width / 1.5,
            shadowColor: "#474747",
            shadowOffset: {
              width: 0,
              height: 3,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3,
            elevation: 10,
          },
          inputContainer: {
            borderBottomWidth: 0,
            height:45
          },
        }}
        onChangeText={onChangeText}
      />
    </View>
  );
};

export default InputComponent;
//{ width: width / 1.5 }
const styles = StyleSheet.create({
  labelStyle: {
    marginLeft: 15,
    marginRight: "auto",
    marginBottom: -7,
    backgroundColor: appColors.bgColor,
    color: appColors.lableHeader,
    zIndex: 1000,
  },
  containerStyle: {
    backgroundColor: appColors.bgColor,
    borderWidth: 1,
    borderColor: "grey",
    borderRadius: 10,
    height: 45,
    shadowColor: "#474747",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3,
    elevation: 10,
  },
});
