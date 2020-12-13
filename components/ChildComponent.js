import React, { useState } from "react";
import { View, Image, Dimensions, Text } from "react-native";
import ReadMore from "@fawazahmed/react-native-read-more";
import { ScrollView, TextInput } from "react-native-gesture-handler";
const ChildComponent = ({
  scrollViewStyle,
  containerStyle,
  iamgeViewStyle,
  imageStyle,
  imgSource,
  firstContentStyle,
  children1,
  children2,
  children3,
  children4,
  children5,
  children6,
  children7,
  secondContentView,
  thirdConentViewStyle,
  ...props
}) => {
  return (
    <ScrollView style={scrollViewStyle}>
      <View style={iamgeViewStyle}>
        <Image style={imageStyle} source={imgSource}></Image>
      </View>

      <View style={firstContentStyle}>
        {children1}
        <ReadMore {...props}>{children2}</ReadMore>
      </View>
      <View style={secondContentView}>
        {children3}
        {children4}
      </View>
      <View style={thirdConentViewStyle}>
        {children5}
        {children6}
      </View>
      <View {...props}>{children7}</View>
    </ScrollView>
  );
};

export default ChildComponent;
