import React, { useState } from "react";
import { View, Image, Dimensions, Text } from "react-native";
import ReadMore from "@fawazahmed/react-native-read-more";
import { ScrollView, TextInput } from "react-native-gesture-handler";
import ViewMoreText from 'react-native-view-more-text';

const ChildComponent = ({
  scrollViewStyle,
  containerStyle,
  iamgeViewStyle,
  imageStyle,
  imgSource,
  firstContentStyle,
  children1,
  editButton1,
  editBox1,
  children2,
  children3,
  children4,editBox2,
  children5,
  children6,
  editBox3,
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
      <View style={containerStyle}>

      <View style={firstContentStyle}>
        {editButton1}
        {children1}
        {editBox1}
        <ViewMoreText {...props}>{children2}</ViewMoreText>
      </View>
      <View style={secondContentView}>
        {children3}
        {children4}
        {editBox2}
      </View>
      <View style={thirdConentViewStyle}>
        {children5}
        {children6}
        {editBox3}
      </View>
      <View {...props}>{children7}</View>
      </View>
    </ScrollView>
  );
};

export default ChildComponent;
