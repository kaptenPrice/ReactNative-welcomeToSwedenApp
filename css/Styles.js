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
    height: 40,
    borderRadius: 15,
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: appColors.borderColor,
    
  },
  loginButtonText: {
    color: appColors.borderColor,
    fontWeight: "400",
    fontSize: 20,
  },
  welcomeViewLoginScreen: {
    flex: 0.5,
    alignItems: "center",
    justifyContent: "center",
    // marginBottom: 30,
    // borderColor:"green",
    // borderWidth:4
  },

  loginScreenMain: {
    color: appColors.textColor,
    fontWeight: "600",
    fontSize: 40,
    // borderColor:"red",
    // borderWidth:1
  },
  viewTextInput: {
    flex: 1,
    justifyContent: "center",
    borderColor:"red",
    borderWidth:5
  },
  textInputStyle: {
    borderColor: appColors.borderColor,
    color: appColors.placeHolderColor,
    borderWidth: 1,
    height: 50,
    // width:300,
    marginHorizontal: 40,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 7,
  },
  viewButtonContainer: {
    flex: 1,
        // width: 500,
        // height: 500,
        justifyContent: 'space-evenly',
        alignItems: 'center',
  },
  loginButtons:{
    flex:1,
    width: 200,
    height: 100,

  },
  infoText: {
    // marginLeft: 20,
    // marginRight: 20,
    // marginTop: 10,
    alignSelf: "center",
  },
  signinRegisterButton: {
    justifyContent: "center",
    alignItems: "center",
    // width: 200,
    borderWidth: 2,
    backgroundColor: "transparent",
    borderColor: "red",
    // borderColor: appColors.borderColor,
    borderRadius: 10,
    height: 60,
    // marginTop: 20,
  },
  signinRegisterButtonText: {
    color: appColors.borderColor,
    fontWeight: "600",
    fontSize: 18,
  },
  forgotPasswordButton: {
    fontWeight: "600",
    fontSize: 18,
    marginBottom: 20,
  },
  drawerComponentView: {
    height: 150,
    backgroundColor: appColors.bgColor,
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
    // paddingBottom: 15,
    marginLeft: 5,
    // alignItems: "baseline"
  },
  childComponentTextContainers: {
    // borderColor:"blue",
    // borderWidth:0.5,
    fontWeight: "bold",
    fontSize: 18,
    paddingBottom: 30,
    marginLeft: 5,
    marginRight: 5,
    marginTop: 10,
    color: appColors.textColor,
  },

  childComponentContentView: {
    paddingTop: 10,
    flex: 2,
    alignItems: "flex-start",
    justifyContent: "center",
    backgroundColor: appColors.bgChildContainers,
    // marginLeft: 7,
    // marginRight: 7,
    marginTop: 10,
  },
  profileScreen: {
    flex: 1,
    backgroundColor: appColors.whiteColor,
  },
  profileButtons: {
    justifyContent: "center",
    alignItems: "center",
    width: 120,
    borderWidth: 1,
    backgroundColor: "transparent",
    borderColor: appColors.borderColor,
    borderRadius: 10,
    height:30,
  },
  userProfileImage: {
    // flex:1,
    height: 140,
    width: 140,
    borderRadius:70
    // marginBottom: 20,
  },
});

export default Styles;

textInputStyleProps: {
  "display",
    "width",
    "height",
    "start",
    "end",
    "top",
    "left",
    "right",
    "bottom",
    "minWidth",
    "maxWidth",
    "minHeight",
    "maxHeight",
    "margin",
    "marginVertical",
    "marginHorizontal",
    "marginTop",
    "marginBottom",
    "marginLeft",
    "marginRight",
    "marginStart",
    "marginEnd",
    "padding",
    "paddingVertical",
    "paddingHorizontal",
    "paddingTop",
    "paddingBottom",
    "paddingLeft",
    "paddingRight",
    "paddingStart",
    "paddingEnd",
    "borderWidth",
    "borderTopWidth",
    "borderStartWidth",
    "borderEndWidth",
    "borderRightWidth",
    "borderBottomWidth",
    "borderLeftWidth",
    "position",
    "flexDirection",
    "flexWrap",
    "justifyContent",
    "alignItems",
    "alignSelf",
    "alignContent",
    "overflow",
    "flex",
    "flexGrow",
    "flexShrink",
    "flexBasis",
    "aspectRatio",
    "zIndex",
    "direction",
    "shadowColor",
    "shadowOffset",
    "shadowOpacity",
    "shadowRadius",
    "transform",
    "transformMatrix",
    "decomposedMatrix",
    "scaleX",
    "scaleY",
    "rotation",
    "translateX",
    "translateY",
    "backfaceVisibility",
    "backgroundColor",
    "borderColor",
    "borderTopColor",
    "borderRightColor",
    "borderBottomColor",
    "borderLeftColor",
    "borderStartColor",
    "borderEndColor",
    "borderRadius",
    "borderTopLeftRadius",
    "borderTopRightRadius",
    "borderTopStartRadius",
    "borderTopEndRadius",
    "borderBottomLeftRadius",
    "borderBottomRightRadius",
    "borderBottomStartRadius",
    "borderBottomEndRadius",
    "borderStyle",
    "opacity",
    "elevation",
    "color",
    "fontFamily",
    "fontSize",
    "fontStyle",
    "fontWeight",
    "fontVariant",
    "textShadowOffset",
    "textShadowRadius",
    "textShadowColor",
    "letterSpacing",
    "lineHeight",
    "textAlign",
    "textAlignVertical",
    "includeFontPadding",
    "textDecorationLine",
    "textDecorationStyle",
    "textDecorationColor",
    "textTransform",
    "writingDirection";
}
