import React, { useState } from 'react';
import { View, Image, Dimensions, Text } from 'react-native';
import { ScrollView, TextInput } from 'react-native-gesture-handler';
// import ViewMoreText from "react-native-view-more-text";
import Styles from '../css/Styles';
import appColors from '../assets/appColor';
import ReadMore from 'react-native-read-more-text';
import { StyleSheet } from 'react-native';

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
        <View style={styles.childComponentContentView}>
          {children1}
          <View style={styles.content}>
            <ReadMore renderTruncatedFooter={null} renderRevealedFooter={null} numberOfLines={3}>
              {children2}
            </ReadMore>
          </View>
          {editBox1}
        </View>
        <View style={styles.childComponentContentView}>
          {children3}
          <View style={styles.content}>
            <ReadMore renderTruncatedFooter={null} renderRevealedFooter={null} numberOfLines={3}>
              {children4}
            </ReadMore>
          </View>
          {editBox2}
        </View>
        <View style={styles.childComponentContentView}>
          {children5}
          <View style={styles.content}>
            <ReadMore renderTruncatedFooter={null} renderRevealedFooter={null} numberOfLines={3}>
              {children6}
            </ReadMore>
          </View>
          {editBox3}
        </View>
        <View
          style={[
            { paddingBottom: 20, flexDirection: 'column', marginTop: 20, marginLeft: 10 },
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
const styles = StyleSheet.create({
  childComponentContentView: {
    borderRadius:15,
    paddingTop: 20,
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'center',
    backgroundColor: appColors.bgColor,
    // borderWidth: 1,
    borderBottomColor: appColors.borderColor,
    marginTop: 20,
    shadowColor: '#eb8034',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  content: { marginTop: 20, marginLeft: 10, marginBottom: 15, marginRight:10 },
});
