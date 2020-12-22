import React, { useState } from "react";
import { View, Image, Dimensions, Text } from "react-native";
import ReadMore from "@fawazahmed/react-native-read-more";
import { ScrollView, TextInput } from "react-native-gesture-handler";
import ViewMoreText from "react-native-view-more-text";
import Styles from "../css/Styles";
import appColors from "../assets/appColor";

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
  children4,
  editBox2,
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
      <View style={{ margin: 10 }}>
        <View style={Styles.childComponentContentView}>
          {editButton1}
          {children1}
          {editBox1}
          <ReadMore
            seeMoreText="More"
            seeMoreStyle={{ color: appColors.textColor, fontWeight: "bold" }}
            backgroundColor={appColors.bgChildContainers}
            seeLessText="Less"
            seeLessStyle={{ color: appColors.textColor, fontWeight: "bold" }}
            numberOfLines={3}
            {...props}
          >
            {children2}
          </ReadMore>
        </View>
        <View style={Styles.childComponentContentView}>
          {children3}
          {children4}
          {editBox2}
        </View>
        <View style={Styles.childComponentContentView}>
          {children5}
          {children6}
          {editBox3}
        </View>
        <View style={[Styles.childComponentContentView, {paddingBottom:20, flexDirection:"column"}]}>{children7}</View>
      </View>
    </ScrollView>
  );
};

export default ChildComponent;
