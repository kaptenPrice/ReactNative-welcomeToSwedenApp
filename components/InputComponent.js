import React, { useEffect } from "react";
import { Dimensions } from "react-native";
import { TextInput } from "react-native";
import { StyleSheet } from "react-native";
import { View, Text } from "react-native";
import { AwesomeTextInput } from "react-native-awesome-text-input";
import appColors from "../assets/appColor";

const InputComponent = ({
  children,
  onChangeText,
  editable,
  value,
  dataDetectorTypes,
  keyboardType,
  placeholder,
  autoCapitalize,
  secureTextEntry,
  ref,
  onFocus,
}) => {
  const { width, height } = Dimensions.get("screen");
  return (
    <View style={{ paddingTop: 20 }}>
      <View
        style={{
          marginLeft: 15,
          marginRight: "auto",
          marginBottom: -9,
          paddingHorizontal: 3,
          zIndex: 1000,
          backgroundColor: appColors.bgColor,
        }}
      >
        <Text
          style={{
            color: appColors.lableHeader,
            // backgroundColor:appColors.bgColor
          }}
        >
          {children}
        </Text>
      </View>
      <TextInput
        style={{
          backgroundColor: appColors.bgColor,
          borderWidth: 1,
          borderColor: appColors.borderColor,
          borderRadius: 10,
          height: 45,
          width: width / 1.5,
          shadowColor: "#474747",
          shadowOffset: {
            width: 0,
            height: 10,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3,
          elevation: 10,
          // paddingTop: 20,
          paddingLeft: 10,
        }}
        placeholder={placeholder}
        value={value}
        editable={editable}
        onChangeText={onChangeText}
        dataDetectorTypes={dataDetectorTypes}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        autoCapitalize={autoCapitalize}
        ref={ref}
        onFocus={onFocus}
        
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
