import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

const ButtonComponent = ({ children, onTouch, buttonStyle, ...props }) => {
  return (
    <TouchableOpacity onPress={onTouch} {...props}>
      <View style={buttonStyle}>{children}</View>
    </TouchableOpacity>
  );
};

export default ButtonComponent;

const styles = StyleSheet.create({});
