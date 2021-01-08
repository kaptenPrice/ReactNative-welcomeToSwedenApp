import React, { useState } from "react";
import { View, Image, Dimensions, Text } from "react-native";
import { ScrollView, TextInput } from "react-native-gesture-handler";
import ViewMoreText from "react-native-view-more-text";
import Styles from "../css/Styles";
import appColors from "../assets/appColor";
import ReadMore from "react-native-read-more-text";

const ChildComponent = ({
  scrollViewStyle,
  iamgeViewStyle,
  imageStyle,
  imgSource,
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
  editBox4,
  ...props
}) => {
  return (
    <ScrollView style={scrollViewStyle}>
      <View style={iamgeViewStyle}>
        <Image style={imageStyle} source={imgSource}></Image>
      </View>
      <View>{editButton1}</View>
      <View style={{ margin: 10 }}>
        <View style={Styles.childComponentContentView}>
          {children1}
          <ReadMore
            renderTruncatedFooter={null}
            renderRevealedFooter={null}
            numberOfLines={3}
          >
            {children2}
          </ReadMore>
          {editBox1}
        </View>
        <View style={Styles.childComponentContentView}>
          {children3}
          <ReadMore
            renderTruncatedFooter={null}
            renderRevealedFooter={null}
            numberOfLines={3}
          >
            {children4}
          </ReadMore>
          {editBox2}
        </View>
        <View style={Styles.childComponentContentView}>
          {children5}
          <ReadMore
            renderTruncatedFooter={null}
            renderRevealedFooter={null}
            numberOfLines={3}
          >
            {children6}
          </ReadMore>
          {editBox3}
        </View>
        <View
          style={[
            // Styles.childComponentContentView,
            { paddingBottom: 20, flexDirection: "column" },
          ]}
        >
          {children7}
          {editBox4}
        </View>
      </View>
    </ScrollView>
  );
};

export default ChildComponent;
