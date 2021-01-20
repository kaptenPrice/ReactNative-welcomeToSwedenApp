/* eslint-disable react/prop-types */

import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { ActionSheetProvider } from "@expo/react-native-action-sheet";

import WelcomeScreen from "./screens/WelcomeScreen";
import appColors from "./assets/appColor";
import LoginScreen from "./screens/LoginScreen";
import Homescreen from "./screens/homeScreens/HomeScreen";
import SocialLife from "./screens/homeScreens/SocialLife";
import SocietyFunctions from "./screens/homeScreens/SocietyFunctions";
import UserProfile from "./screens/homeScreens/UserProfile";
import DrawerComponent from "./components/DrawerComponent";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";
import {
  Ionicons,
  FontAwesome,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import Fika from "./screens/socialLifeScreens/Fika";
import Food from "./screens/socialLifeScreens/Food";
import Traditions from "./screens/socialLifeScreens/Traditions";
import Study from "./screens/societalFunctionsScreens/Study";
import Job from "./screens/societalFunctionsScreens/Job";
import HealthCare from "./screens/societalFunctionsScreens/HealthCare";
import SplashScreen from "./screens/SplashScreen";
import { useSelector } from "react-redux";
import useAuthenticatedUser from "./components/useaAuthenticateUser";
import ButtonComponent from "./components/ButtonComponent";
import FeedBack from "./screens/settingScreens/FeedBack";
import signoutScreen from "./screens/homeScreens/SignOutScreen";
import SignOutScreen from "./screens/homeScreens/SignOutScreen";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

const WelcomeToSweden = () => {
  const { isloading, isSignedIn } = useSelector(
    (state) => state.authentication
  );
  useAuthenticatedUser();

  if (isloading) {
    return <SplashScreen />;
  }
  return (
    <NavigationContainer>
      {!isSignedIn ? (
        <Stack.Navigator
          screenOptions={{
            headerStyle: { backgroundColor: appColors.bgColor },
            headerTintColor: appColors.whiteColor,
          }}
        >
          <Stack.Screen
            name="WelcomScreen"
            component={WelcomeScreen}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="LoginScreen"
            component={LoginScreen}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      ) : (
        <ActionSheetProvider>
          <DrawerNavigator />
        </ActionSheetProvider>
      )}
    </NavigationContainer>
  );
};
const HomeTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color }) => {
          let iconName;
          if (route.name === "Home") {
            iconName = focused ? "home-outline" : "home-outline";
            color = focused ? "#2f3030" : "#7d7d7d";
          } else if (route.name === "SocialLife") {
            iconName = "human-male-male";
            color = focused ? "#2f3030" : "#7d7d7d";
          } else if (route.name === "SocietalFunctions") {
            iconName = "office-building";
            color = focused ? "#2f3030" : "#7d7d7d";
          }

          return (
            <MaterialCommunityIcons name={iconName} size={30} color={color} />
          );
        },
      })}
      tabBarOptions={{
        showLabel: false,
        style: { backgroundColor: appColors.bgColor },
      }}
    >
      <Tab.Screen name="Home" component={Homescreen} />
      <Tab.Screen name="SocialLife" component={SocialLifeNavigator} />
      <Tab.Screen
        name="SocietalFunctions"
        component={SocietyFunctionsNavigator}
      />
    </Tab.Navigator>
  );
};

const SocialLifeNavigator = () => (
  <Stack.Navigator
    screenOptions={{
      headerStyle: { backgroundColor: appColors.bgColor },
      headerTintColor: appColors.textColor,
    }}
  >
    <Stack.Screen
      options={{ headerShown: false }}
      name="SocialLife"
      component={SocialLife}
    />
    <Stack.Screen
      options={{ headerShown: false }}
      name="Fika"
      component={Fika}
    />
    <Stack.Screen
      options={{ headerShown: false }}
      name="Food"
      component={Food}
    />
    <Stack.Screen
      options={{ headerShown: false }}
      name="Traditions"
      component={Traditions}
    />
  </Stack.Navigator>
);
const SocietyFunctionsNavigator = () => (
  <Stack.Navigator
    screenOptions={{
      headerStyle: { backgroundColor: appColors.bgColor },
      headerTintColor: appColors.textColor,
    }}
  >
    <Stack.Screen
      options={{ headerShown: false, headerBackAccessibilityLabel: "true" }}
      name="SocietyFunctions"
      component={SocietyFunctions}
    />
    <Stack.Screen
      options={{ headerShown: false, headerBackAccessibilityLabel: "true" }}
      name="Study"
      component={Study}
    />
    <Stack.Screen options={{ headerShown: false, headerBackAccessibilityLabel: "true" }} name="Job" component={Job} />
    <Stack.Screen
      options={{ headerShown: false }}
      name="Healthcare"
      component={HealthCare}
    />
  </Stack.Navigator>
);

const getHeaderTitle = (route) => {
  const { currentUser } = useSelector((state) => state.authentication);
  const { isAdmin, name, email, phone, city } = useSelector(
    (state) => state.userAdditionalInfo
  );

  const routeName = getFocusedRouteNameFromRoute(route) ?? "Home";
  switch (routeName) {
    case "Home":
      if (name) return `Welcome ${name}`;
      else {
        // currentUser == undefined;
        return `Welcome ${currentUser.email}`;
      }
    case "SocialLife":
      return "Social life";
    case "SocietalFunctions":
      return "Society functions";
    case "Profile":
      return "Menu";
  }
};
const HomeStackNavigator = ({ navigation }) => (
  <Stack.Navigator
    screenOptions={{
      headerStyle: { backgroundColor: appColors.bgColor },
      headerTintColor: appColors.textColor,
      headerRight: () => (
        <Ionicons
          onPress={() => navigation.openDrawer()}
          name="ios-person"
          size={30}
          color={appColors.placeHolderColor}
          style={{ marginRight: 10 }}
        />
      ),
    }}
  >
    <Stack.Screen
      options={({ route }) => ({
        title: getHeaderTitle(route),
        headerTitle: getHeaderTitle(route),
      })}
      name="HomeTabs"
      component={HomeTabNavigator}
    />
  </Stack.Navigator>
);
const MenuStackNavigator = () => (
  <Stack.Navigator
    screenOptions={{
      headerStyle: { backgroundColor: appColors.bgColor },
      headerTintColor: appColors.textColor,
    }}
  >
    <Stack.Screen
      name="settings"
      component={UserProfile}
      options={{ headerShown: false, headerBackAccessibilityLabel: "true" }}
    />
  </Stack.Navigator>
);

const DrawerNavigator = () => (
  <Drawer.Navigator
    drawerPosition="right"
    drawerContent={(props) => <DrawerComponent {...props} />}
  >
    <Drawer.Screen
      options={{
        drawerIcon: () => (
          <Ionicons name="ios-home" size={24} color={appColors.iconInActive} />
        ),
      }}
      name="Home"
      component={HomeStackNavigator}
    />

    <Drawer.Screen
      options={{
        swipeEnabled: true,
        drawerIcon: () => (
          <Ionicons
            name="ios-settings"
            size={24}
            color={appColors.iconInActive}
          />
        ),
      }}
      name="Settings"
      component={MenuStackNavigator}
    />
    <Drawer.Screen
      options={{
        drawerIcon: () => (
          <Ionicons name="ios-apps" size={24} color={appColors.iconInActive} />
        ),
      }}
      name="Feedback"
      component={FeedBack}
    />
    <Drawer.Screen
      options={{
        drawerIcon: () => (
          <FontAwesome
            name="sign-out"
            size={30}
            color={appColors.iconInActive}
          />
        ),
      }}
      name="Sign out"
      component={SignOutScreen}
    />
  </Drawer.Navigator>
);

export default WelcomeToSweden;
