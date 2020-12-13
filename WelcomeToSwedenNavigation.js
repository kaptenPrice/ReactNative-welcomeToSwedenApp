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
import  {Ionicons, FontAwesome,MaterialCommunityIcons}  from '@expo/vector-icons';
import Fika from "./screens/socialLifeScreens/Fika";
import Food from "./screens/socialLifeScreens/Food";
import Traditions from "./screens/socialLifeScreens/Traditions";
import Study from "./screens/societalFunctionsScreens/Study";
import Job from "./screens/societalFunctionsScreens/Job";
import HealthCare from "./screens/societalFunctionsScreens/HealthCare";
import SplashScreen from "./screens/SplashScreen";
import { useSelector } from "react-redux";
import useAuthenticatedUser from "./hooks/useaAuthenticateUser"
import ButtonComponent from "./components/ButtonComponent";
import FeedBack from "./screens/settingScreens/FeedBack";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

const WelcomeToSweden = () => {
  const authentication=useSelector((state)=> state.authentication)
  useAuthenticatedUser()

  if (authentication.isloading) {
    return <SplashScreen />;
  }
  return (
    <NavigationContainer>
      {!authentication.isSignedIn ? (
        <Stack.Navigator
          screenOptions={{
            headerStyle: { backgroundColor: appColors.bgColor },
            headerTintColor: appColors.whiteColor,
          }}
        >
          <Stack.Screen
            name="WelcomScreen"
            component={WelcomeScreen}
            options={{ headerShown: true }}
          />

          <Stack.Screen
            name="LoginScreen"
            component={LoginScreen}
            options={{ headerShown: true }}
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
  const [isActive, setIsActive] = useState(false);
  
  return (
    <Tab.Navigator
    
      screenOptions={({ route }) => ({
        // eslint-disable-next-line react/display-name
        tabBarIcon: ({ focused, color }) => {
          let iconName;
          if (route.name === "Home") {
            iconName = focused ? "home-outline" : "home-outline";
            color = focused ? "#2f3030" : "#7d7d7d";
          } else if (route.name === "SocialLife") {
            iconName = "human-male-male";
            color = focused ? "#2f3030" : "#7d7d7d";
          // } else if (route.name === "Profile") {
          //   iconName = "ios-person";
          //   color = focused ? "#2f3030" : "#7d7d7d";
          } else if (route.name === "SocietalFunctions") {
            iconName = "office-building";
            color = focused ? "#2f3030" : "#7d7d7d";
          }
          // <FontAwesome name="building-o" size={24} />

          return  <MaterialCommunityIcons name={iconName} size={30} color={color} />;
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
      {/* <Tab.Screen name="Profile" component={UserProfile} /> */}
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
      options={{ headerShown: true }}
      name="SocialLife"
      component={SocialLife}
    />
    <Stack.Screen
      options={{ headerShown: true }}
      name="Fika"
      component={Fika}
    />
    <Stack.Screen
      options={{ headerShown: true }}
      name="Food"
      component={Food}
    />
    <Stack.Screen
      options={{ headerShown: true }}
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
      options={{ headerShown: true }}
      name="SocietyFunctions"
      component={SocietyFunctions}
    />
    <Stack.Screen
      options={{ headerShown: true }}
      name="Study"
      component={Study}
    />
    <Stack.Screen options={{ headerShown: true }} name="Job" component={Job} />
    <Stack.Screen
      options={{ headerShown: true }}
      name="Healthcare"
      component={HealthCare}
    />
  </Stack.Navigator>
);

const getHeaderTitle = (route) => {
  const routeName = getFocusedRouteNameFromRoute(route) ?? "Home";
  switch (routeName) {
    case "Home":
      return "Home";
    case "SocialLife":
      return "Social life";
    case "SocietalFunctions":
      return "Society functions";
    case "Profile":
      return "My profile";
  }
};
// eslint-disable-next-line react/prop-types
const HomeStackNavigator = ({ navigation }) => (
  <Stack.Navigator
    screenOptions={{
      headerStyle: { backgroundColor: appColors.bgColor },
      headerTintColor: appColors.textColor,
      // eslint-disable-next-line react/display-name
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
    {/* TODO add more screens here for drawerMenu e.g feeback */}
    <Stack.Screen
      name="settings"
      component={UserProfile}
      options={{ headerShown: true, headerBackAccessibilityLabel: "true" }}
    />
  </Stack.Navigator>
);

const DrawerNavigator = () => (
  <Drawer.Navigator
    drawerPosition="right"
    drawerContent={(props) => <DrawerComponent {...props} />}
  >
    <Drawer.Screen
      options={{ drawerIcon: () => <Ionicons name="ios-home" size={24} /> }}
      name="Home"
      component={HomeStackNavigator}
    />
    <Drawer.Screen
      options={{
        swipeEnabled: true,
        drawerIcon: () => <Ionicons name="ios-settings" size={24} />,
      }}
      name="Settings"
      component={MenuStackNavigator}
    />
    <Drawer.Screen
   options={{
     drawerIcon: () => <Ionicons name="ios-apps" size={24}/>
   }}
    name ="Feedback"
    component={FeedBack}
    />
 
  </Drawer.Navigator>
);

export default WelcomeToSweden;
