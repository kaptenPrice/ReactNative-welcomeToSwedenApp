import { Platform, StyleSheet, Dimensions } from "react-native";
import appColors from "../assets/appColor";

const Styles = StyleSheet.create({
  welcomeView: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: appColors.bgColor,
  },
  welcomeViewUpper: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    borderBottomColor: "black",
    borderBottomWidth: 10,
    borderRadius: 20,
    borderTopWidth: 10,
  },

  welcomeText: {
    fontSize: 46,
    fontWeight: "bold",
    color: appColors.textColor,
  },

  loginButton: {
    justifyContent: "center",
    alignItems: "center",
    width: 200,
    height: 60,
    borderRadius: 15,
    backgroundColor: "transparent",
    borderWidth: 3,
    borderColor: appColors.borderColor,
  },
  loginButtonText: {
    color: appColors.borderColor,
    fontWeight: "400",
    fontSize: 20,
  },
  welcomeViewLoginScreen: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    marginBottom: 30,
  },

  loginScreenMain: {
    color: appColors.borderColor,
    fontWeight: "400",
    fontSize: 40,
  },
  viewTextInput: {
    flex: 1,
    justifyContent: "center",
  },
  textInputStyle: {
    borderColor: appColors.borderColor,
    color: appColors.placeHolderColor,
    borderWidth: 1,
    height: 50,
    marginHorizontal: 40,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 7,
  },
  viewSigninRegisterButtons: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 30,
  },
  infoText: { marginLeft: 20, marginRight:20, marginTop:10, alignSelf: "center" },
  signinRegisterButton: {
    justifyContent: "center",
    alignItems: "center",
    width: 200,
    borderWidth: 2,
    backgroundColor: "transparent",
    borderColor: appColors.borderColor,
    borderRadius: 10,
    height: 40,
    marginTop: 20,
  },
  signinRegisterButtonText: {
    color: appColors.borderColor,
    fontWeight: "600",
    fontSize: 18,
  },
  drawerComponentView: {
    height: 150,
    backgroundColor: appColors.whiteColor,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: Platform.OS == "android" ? 20 : 0,
  },
  drawerComponentText: {
    fontSize: 24,
    color: appColors.textColor,
    fontWeight: "100",
  },
  homeButtonTouchStyle: {
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 3,
    borderColor: appColors.iconInActive,
    backgroundColor: "transparent",
    borderRadius: 10,
    paddingTop: 10,
    paddingBottom: 10,
    marginTop: 10,
  },
  homeButtonText: {
    color: appColors.textColor,
    fontWeight: "bold",
    fontSize: 40,
    shadowColor: null,
    shadowOffset: {
      width: null,
      height: null,
    },
    shadowOpacity: null,
    shadowRadius: null,
    borderRadius: null,
    elevation: null,
  },

  socialLifeButtonComp: {
    alignItems: "center",
    borderWidth: 3,
    borderColor: appColors.iconActive,
    backgroundColor: "transparent",
    borderRadius: 10,
    width: 350,
    marginBottom: 10,
  },
  socialLifeButtonText: {
    color: appColors.textColor,
    fontWeight: "bold",
    fontSize: 24,
    textAlign: "left",
  },
  childComponentScrollView: {
    flex: 1,
    backgroundColor: "purple",
  },
  childComponentImageStyle: {
    flex: 1,
    width: null,
    height: null,
  },
  childComponentHeaders: {
    fontSize: 24,
    fontWeight: "bold",
    paddingBottom: 15,
    marginLeft: 5,
    // alignItems: "baseline"
  },
  childComponentTextContainers: {
    fontWeight: "400",
    fontSize: 18,
    marginLeft: 5,
    marginRight: 5,
    paddingBottom: 35,
  },

  childComponentContentView: {
    paddingTop: 20,
    flex: 2,
    alignItems: "flex-start",
    justifyContent: "center",
    backgroundColor: appColors.bgChildContainers,
    marginLeft: 7,
    marginRight: 7,
    marginTop: 5,
  },
});

export default Styles;
