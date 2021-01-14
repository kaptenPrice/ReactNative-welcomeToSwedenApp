import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Button,
  Dimensions,
  TextInput,
  StyleSheet,
} from "react-native";
import Styles from "../../css/Styles";
import {
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons/";
import { AwesomeTextInput } from "react-native-awesome-text-input";

import ButtonComponent from "../../components/ButtonComponent";
import { useNavigation } from "@react-navigation/native";
import firebase from "firebase/app";
import "firebase-auth";

import { useDispatch, useSelector } from "react-redux";
import { TextInputComponent } from "react-native";
import appColors from "../../assets/appColor";
import { TouchableOpacity } from "react-native-gesture-handler";
import { element } from "prop-types";

const FeedBack = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { width, height } = Dimensions.get("window");
  const { name, email, phone, city } = useSelector(
    (state) => state.userAdditionalInfo
  );

  const { isLoading, currentUser } = useSelector(
    (state) => state.authentication
  );
  const [isEditable, setIsEditable] = useState(false);
  const [scale, setScale] = useState([
    { value: 1 },
    { value: 2 },
    { value: 3 },
    { value: 4 },
    { value: 5 },
    { value: 6 },
    { value: 7 },
    { value: 8 },
    { value: 9 },
    { value: 10 },
  ]);


  const list = () => {
    return scale.map((element) => {
      return (
        <TouchableOpacity
          key={element.value}
          style={{
            padding: 0,
            borderColor: appColors.borderColor,
            borderBottomWidth: 1,
            borderTopWidth: 1,
            borderRightWidth: 1,
            borderLeftWidth: 1,

            shadowColor: "#474747",
            shadowOffset: {
              width: 0,
              height: 3,
            },
            shadowOpacity: 0.25,
            shadowRadius: 5,
            elevation: 10,
          }}
        >
          <Text style={{ padding: 10, backgroundColor:appColors.bgColor }}>{element.value}</Text>
        </TouchableOpacity>
      );
    });
  };

  return (
    <View style={styles.cont}>
      <View
        style={{
          flex: 0.1,
          paddingBottom: 5,
          alignItems: "flex-end",
          justifyContent: "center",
          // alignContent:"space-around",
          flexDirection: "row",
          height: height / 20,
          borderBottomWidth: 1,
          borderColor: appColors.borderColor,
        }}
      >
        <View style={{ marginRight: width / 1.1 }}>
          <ButtonComponent onPress={() => navigation.navigate("Home")}>
            <MaterialCommunityIcons
              name="home"
              size={28}
              color={appColors.iconInActive}
            />
          </ButtonComponent>
        </View>
        <View style={{ position: "absolute" }}>
          <Text style={{ fontSize: 28 }}>FeedBack</Text>
        </View>
      </View>
      <View
        style={{
          flexDirection: "column",
          justifyContent: "center",
          marginVertical: 10,
          borderBottomWidth: 1,
          borderColor: appColors.borderColor,
        }}
      >
        <View style={{ alignItems: "center" }}>
          <Text> How satisfied are you with this app? </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            marginTop: 20,
            marginBottom: 10,
          }}
        >
          {list()}
        </View>
      </View>

      <View
        style={{
          flex: 1,
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <View style={{ marginTop: 10, paddingTop: 10 }}>
          <Text
            style={{
                            marginLeft: 15,
              marginRight: "auto",
              marginBottom: -7,
              backgroundColor: appColors.bgColor,
              color: appColors.lableHeader,
              zIndex: 1000,
              
            }}
          >
            Name
          </Text>

          <AwesomeTextInput
            customStyles={{
              container: {
                backgroundColor:appColors.bgColor,
                borderWidth: 1,
                borderColor: "grey",
                borderRadius: 10,
                height: 45,
                width: width / 1.5,
                shadowColor: "#474747",
            shadowOffset: {
              width: 0,
              height: 3,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3,
            elevation: 10,
              },
              inputContainer: {
                borderBottomWidth: 0,
              },
            }}
            onChangeText={(e) => console.log(e)}
          />
        </View>
        <View style={{ marginTop: 10 }}>
          <Text
            style={{
              // flex: 1,
              marginLeft: 15,
              marginRight: "auto",
              marginBottom: -9,
              backgroundColor: appColors.bgColor,
              color: appColors.lableHeader,
              zIndex: 1000,
            }}
          >
            Mail
          </Text>

          <AwesomeTextInput
            customStyles={{
              container: {
                backgroundColor:appColors.bgColor,
                borderWidth: 1,
                borderColor: "grey",
                borderRadius: 10,
                height: 45,
                width: width / 1.5,
                shadowColor: "#474747",
                shadowOffset: {
                  width: 0,
                  height: 3,
                },
                shadowOpacity: 0.25,
                shadowRadius: 3,
                elevation: 10,
              },
              inputContainer: {
                borderBottomWidth: 0,
              },
            }}
            onChangeText={(e) => console.log(e)}
          />
        </View>
        <View style={{ marginTop: 10 }}>
          <Text
            style={{
              marginLeft: 15,
              marginRight: "auto",
              marginBottom: -9,
              backgroundColor: appColors.bgColor,
              color: appColors.lableHeader,
              zIndex: 1000,
              paddingHorizontal:3
            }}
          >
            Feedback
          </Text>

          <AwesomeTextInput
            customStyles={{
              container: {
                backgroundColor:appColors.bgColor,
                borderWidth: 1,
                borderColor: "grey",
                borderRadius: 10,
                height: 250,
                width: width / 1.5,
                shadowColor: "#474747",
                shadowOffset: {
                  width: 0,
                  height: 3,
                },
                shadowOpacity: 0.25,
                shadowRadius: 3,
                elevation: 10,
              },
              inputContainer: {
                borderBottomWidth: 0,
              },
            }}
            onChangeText={(e) => console.log(e)}
          />
        </View>
        <View
          style={{ flex: 1, flexDirection: "column", justifyContent: "center" }}
        >
          <ButtonComponent
            style={[styles.feedbackButton, { width: width / 2 }]}
            onTouch={(e) => console.log(e)}
          >
            <Text style={{ color: "white", paddingBottom: 15, fontSize: 18 }}>
              Send feedback
              <Ionicons style={{marginLeft:10}} name="ios-send" color="white" size={24} />
            </Text>
         

          </ButtonComponent>

          {/* <Text
            style={{
              // flex: 1,
              marginLeft: 15,
              marginRight: "auto",
              marginBottom: -9,
              backgroundColor: appColors.bgColor,
              color: appColors.lableHeader,
              zIndex: 1000,
            }}
          >
            Feedback
          </Text> */}

          {/* <AwesomeTextInput
            customStyles={{
              container: {
                borderWidth: 1,
                borderColor: "grey",
                borderRadius: 10,
                // height: 200,
                width: width / 1.5,
              },
              inputContainer: {
                borderBottomWidth: 0,
              },
            }}
            editable={isEditable}
            onChangeText={(e) => console.log(e)} */}

          {/* /> */}
        </View>
      </View>
      {/* 
      <View
        style={{
          flex: 1,
          flexDirection: "row-reverse",
          alignItems: "center",
          justifyContent: "center",
          alignContent: "space-around",
          borderColor: "green",
          borderWidth: 2,
        }}
      >
        <ButtonComponent
          // buttonStyle={{ marginLeft: width / 2.2 }}
          onTouch={() => console.log("feedback send")}
        >
          <Ionicons name="ios-send" color={appColors.iconInActive} size={30} />
        </ButtonComponent>
        <ButtonComponent onPress={() => navigation.navigate("Home")}>
          <MaterialCommunityIcons
            name="home"
            size={30}
            color={appColors.iconInActive}
          />
        </ButtonComponent>
      </View> */}
    </View>
    // <View
    //   style={{ flex: 1, alignSelf: "flex-start", marginLeft: 250 }}
    // ></View>
    // </View>
  );
};

export default FeedBack;
const styles = StyleSheet.create({
  cont: {
    flex: 1,
    backgroundColor: appColors.bgColor,
  },
  feedbackButton: {
    borderRadius: 5,
    backgroundColor: "grey",
    flexDirection: "column",
    alignItems: "center",
    paddingTop:5
  },
});

// {
/* <View
        style={{
          flex: 1,
          alignItems: "center",
        }}
      >
         <MaterialCommunityIcons
          name="thought-bubble-outline"
          size={30}
          color={appColors.iconInActive}
        />
        <TextInput
          // placeholder="feedback ",
          style={{
            flex: 1,
            backgroundColor: appColors.bgFeedBack,
            // height: height / 1.2,
            width: width / 1.2,
            borderRadius: 7,
            // marginBottom: 40,
            // textAlign: "left",
            // textAlignVertical:"top"
            textAlign:"justify"
          }}
        >
        </TextInput>
      </View> 
    */
// }
