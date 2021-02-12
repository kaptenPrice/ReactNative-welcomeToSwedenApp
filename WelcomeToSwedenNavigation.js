/* eslint-disable react/prop-types */

import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { ActionSheetProvider } from '@expo/react-native-action-sheet';

import WelcomeScreen from './screens/WelcomeScreen';
import appColors from './assets/appColor';
import LoginScreen from './screens/LoginScreen';
import Homescreen from './screens/homeScreens/HomeScreen';
import SocialLife from './screens/homeScreens/SocialLife';
import SocietyFunctions from './screens/homeScreens/SocietyFunctions';
import UserProfile from './screens/homeScreens/UserProfile';
import DrawerComponent from './components/DrawerComponent';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import Fika from './screens/socialLifeScreens/Fika';
import Food from './screens/socialLifeScreens/Food';
import Traditions from './screens/socialLifeScreens/Traditions';
import Study from './screens/societalFunctionsScreens/Study';
import Job from './screens/societalFunctionsScreens/Job';
import HealthCare from './screens/societalFunctionsScreens/HealthCare';
import SplashScreen from './screens/SplashScreen';
import { useSelector } from 'react-redux';
import useAuthenticatedUser from './components/useaAuthenticateUser';
import ButtonComponent from './components/ButtonComponent';
import FeedBack from './screens/settingScreens/FeedBack';
import SignOutScreen from './screens/homeScreens/SignOutScreen';
import AnimatedComponent from './screens/socialLifeScreens/AnimatedComponent';
import PersonSvg from './assets/svg/PersonSvg';
import HomeSvg from './assets/svg/HomeSvg';
import FriendsSvg from './assets/svg/FriendsSvg';
import SocieltalFunctionsSvg from './assets/svg/SocieltalFunctionsSvg';
import SettingsSvg from './assets/svg/SettingsSvg';
import FeedbackSvg from './assets/svg/FeedbackSvg';
import SignOutSvg from './assets/svg/SignOut';
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

const WelcomeToSwedenNavigation = () => {
  const { isloading, isSignedIn } = useSelector((state) => state.authentication);
  useAuthenticatedUser();

  if (isloading) {
    return <SplashScreen />;
  }
  return (
    <NavigationContainer>
      {!isSignedIn ? (
        <Stack.Navigator>
          <Stack.Screen
            name="WelcomScreen"
            component={WelcomeScreen}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="LoginScreen"
            component={LoginScreen}
            options={{
              headerShown: false,
              headerBackAccessibilityLabel: false,
            }}
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
      backBehavior="initialRoute"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color }) => {
          let iconName;
          if (route.name === 'Home') {
            return focused ? (
              <HomeSvg props={appColors.iconActive} />
            ) : (
              <HomeSvg props={appColors.iconInActive} />
            );
          } else if (route.name === 'SocialLife') {
            return focused ? (
              <FriendsSvg props={appColors.iconActive} />
            ) : (
              <FriendsSvg props={appColors.iconInActive} />
            );
          } else if (route.name === 'SocietalFunctions') {
            return focused ? (
              <SocieltalFunctionsSvg fill={appColors.iconActive} />
            ) : (
              <SocieltalFunctionsSvg fill={appColors.iconInActive} />
            );
          }
        },
      })}
      tabBarOptions={{
        showLabel: false,
        style: { backgroundColor: 'transparent', borderTopWidth: 0 },
      }}
    >
      <Tab.Screen name="Home" component={Homescreen} />
      <Tab.Screen name="SocialLife" component={SocialLifeNavigator} />
      <Tab.Screen name="SocietalFunctions" component={SocietyFunctionsNavigator} />
    </Tab.Navigator>
  );
};

const SocialLifeNavigator = () => (
  <Stack.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: appColors.bgColor,
        shadowColor: 'transparent',
      },
      headerTintColor: appColors.textColor,
    }}
  >
    <Stack.Screen options={{ headerShown: false }} name="SocialLife" component={SocialLife} />
    <Stack.Screen
      options={{ headerShown: true, headerBackTitle: ' ' }}
      name="Fika"
      component={Fika}
    />
    <Stack.Screen
      options={{ headerShown: true, headerBackTitle: ' ' }}
      name="Food"
      component={Food}
    />
    <Stack.Screen
      options={{ headerShown: true, headerBackTitle: ' ' }}
      name="Traditions"
      component={Traditions}
    />
    <Stack.Screen
      options={{ headerShown: true, headerBackTitle: ' ' }}
      name="AnimatedComponent"
      component={AnimatedComponent}
    />
  </Stack.Navigator>
);
const SocietyFunctionsNavigator = () => (
  <Stack.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: appColors.bgColor,
        shadowColor: 'transparent',
      },
      headerTintColor: appColors.textColor,
    }}
  >
    <Stack.Screen
      options={{ headerShown: false, headerBackAccessibilityLabel: 'true' }}
      name="SocietyFunctions"
      component={SocietyFunctions}
    />
    <Stack.Screen
      options={{ headerShown: true, headerBackTitle: ' ' }}
      name="Study"
      component={Study}
    />
    <Stack.Screen
      options={{ headerShown: true, headerBackTitle: ' ' }}
      name="Job"
      component={Job}
    />
    <Stack.Screen
      options={{ headerShown: true, headerBackTitle: ' ' }}
      name="Healthcare"
      component={HealthCare}
    />
  </Stack.Navigator>
);

const getHeaderTitle = (route) => {
  const { currentUser } = useSelector((state) => state.authentication);
  const { isAdmin, name, email } = useSelector((state) => state.userAdditionalInfo);

  const routeName = getFocusedRouteNameFromRoute(route) ?? 'Home';

  switch (routeName) {
    case 'Home':
      if (name) return `Welcome ${name}`;
      else {
        return `Welcome ${currentUser.email}`;
      }
    case 'SocialLife':
      return 'Social life';
    case 'SocietalFunctions':
      return 'Society functions';
  }
};
const HomeStackNavigator = ({ navigation }) => (
  <Stack.Navigator
    screenOptions={{
      headerStyle: { backgroundColor: appColors.bgColor },
      headerTintColor: appColors.textColor,
      headerRight: () => (
        <PersonSvg onPress={() => navigation.openDrawer()} style={{ marginRight: 12 }} />
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
      headerStyle: { backgroundColor: 'transparent' },
      headerTintColor: appColors.textColor,
    }}
  >
    <Stack.Screen
      name="settings"
      component={UserProfile}
      options={{
        headerBackTitleVisible: false,
        headerShown: false,
        headerBackAccessibilityLabel: ' ',
      }}
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
        drawerIcon: () => <HomeSvg props={appColors.placeHolderColor}/>,
      }}
      name="Home"
      component={HomeStackNavigator}
    />

    <Drawer.Screen
      options={{
        headerShown: true,

        headerTintColor: appColors.textColor,
        swipeEnabled: true,
        drawerIcon: () => <SettingsSvg />,
      }}
      name="Settings"
      component={MenuStackNavigator}
    />
    <Drawer.Screen
      options={{
        headerShown: true,
        headerBackAccessibilityLabel: 'true',
        headerTintColor: appColors.textColor,

        drawerIcon: () => <FeedbackSvg />,
      }}
      name="Feedback"
      component={FeedBack}
    />
    <Drawer.Screen
      options={{
        drawerIcon: () => (
          <SignOutSvg
          // style={{ marginRight: 0 }}
          // name="sign-out"
          // size={24}
          // color={appColors.iconInActive}
          />
        ),
      }}
      name="Sign out"
      component={SignOutScreen}
    />
  </Drawer.Navigator>
);

export default WelcomeToSwedenNavigation;
