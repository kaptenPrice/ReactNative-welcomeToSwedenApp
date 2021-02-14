import React from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView, Platform } from 'react-native';
import appColors from '../assets/appColor';
import { DrawerItemList } from '@react-navigation/drawer';
import MenuSvg from '../assets/svg/MenuSvg';
import PersonSvg from '../assets/svg/PersonSvg';

export default function DrawerComponent(props) {
  return (
    <SafeAreaView style={{ backgroundColor: appColors.bgColor, flex: 1 }}>
      <View style={styles.drawerComponentView}>
        <PersonSvg height="40" height="40" />
        <Text style={styles.drawerComponentText}>Menu</Text>
      </View>
      <DrawerItemList {...props} />
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  drawerComponentView: {
    height: 150,
    backgroundColor: appColors.bgColor,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: Platform.OS == 'android' ? 20 : 0,
  },
  drawerComponentText: {
    paddingTop: 10,
    fontSize: 24,
    color: appColors.textColor,
    fontWeight: '300',
  },
});
