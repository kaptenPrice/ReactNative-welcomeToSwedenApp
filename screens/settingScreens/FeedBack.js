import React, { useState, useEffect, useRef } from "react";
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

import { isSendingData } from "../../redux/store/actions";
import { useDispatch, useSelector } from "react-redux";
import { TextInputComponent } from "react-native";
import appColors from "../../assets/appColor";
import { TouchableOpacity } from "react-native-gesture-handler";
import NpsComponent from "../../components/NpsComponent";
import InputComponent from "../../components/InputComponent";
import * as db from "../../firestore/FirebaseUtils";
import AfterFeedback from "../../components/AfterFeedback";

const FeedBack = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const textInputRef = useRef("");
  const { width, height } = Dimensions.get("screen");

  const { name, email, phone, city, uid } = useSelector(
    (state) => state.userAdditionalInfo
  );

  const { isLoading, currentUser } = useSelector(
    (state) => state.authentication
  );
  const [grade, setGrade] = useState(0);
  const [incomingFeedback, setIncomingFeedback] = useState("");
  const [thanks, setThanks] = useState(false);
  const [isFeedbackDone, setIsFeedbackDone] = useState(false);

  useEffect(() => {
    // setIsFeedbackDone(false);
    setGrade(0);
    setThanks(false);
  }, []);

  const checkInputLength = () =>
    incomingFeedback.length > 5 ? setThanks(true) : setThanks(false);

  const sendFeedbackToDB = () => {
    setIncomingFeedback("");
    textInputRef.current.setNativeProps({ text: "" });
    dispatch(isSendingData(true));
    const data = {
      grade: grade,
      feedback: incomingFeedback,
      from: email,
      uid: uid,
      created: new Date(),
    };
    try {
      db.handleSaveFeedback("feedback", data);
      dispatch(isSendingData(false));
    } catch (error) {
      console.log(error);
    } finally {
      setIsFeedbackDone(true);
    }
  };

  return (
    <View style={styles.container1}>
      <View style={[styles.header]}>
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
          <Text
            style={{
              fontSize: 28,
              fontWeight: "700",
              color: appColors.bgFeedBack,
            }}
          >
            FeedBack
          </Text>
        </View>
      </View>
      <View style={styles.gradeConatiner}>
        <View style={{ alignItems: "center" }}>
          <Text> How satisfied are you with this app? </Text>
        </View>
        <View style={styles.npsBar}>
          <NpsComponent value={grade} setValue={setGrade} />
        </View>
        {/* <Text>{incomingFeedback}</Text>   */}
      </View>

      <View
        style={{
          flex: 1,
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <View style={{ marginTop: 10 }}>
          <Text style={styles.labelStyle}>Feedback</Text>

          <TextInput
            style={{
              backgroundColor: appColors.bgColor,
              borderWidth: 1,
              borderColor: "grey",
              borderRadius: 10,
              height: 250,
              width: width / 1.2,
              shadowColor: "#474747",
              shadowOffset: {
                width: 0,
                height: 3,
              },
              shadowOpacity: 0.25,
              shadowRadius: 3,
              elevation: 10,
              height: 250,
              paddingTop: 20,
              paddingLeft: 20,
            }}
            numberOfLines={0}
            multiline={true}
            onChangeText={(e) => setIncomingFeedback(e)}
            onEndEditing={checkInputLength}
            ref={textInputRef}
          />
          {thanks ? (
            <Text style={styles.thanksText}>
              Thank Push the button below to send your opinion when u r done
            </Text>
          ) : null}
        </View>
        <View
          style={{
            flex: 1,
            justifyContent: "flex-start",
            alignItems: "flex-end",
            // borderColor:"red",
            // borderWidth:2,
            width: width / 1.2,
            height:height/1,
            marginTop:15
          }}
        >
          <ButtonComponent
            style={styles.sendButtonStyle}
            buttonStyle={[styles.feedbackButton, {}]}
            onTouch={sendFeedbackToDB}
          >
            <Ionicons style={{}} name="ios-send" color="white" size={40} />
          </ButtonComponent>
        </View>
        {isFeedbackDone && (
          <AfterFeedback
          // <MaterialCommunityIcons name="close-circle-outline" size={24} color="black" />
          visible={isFeedbackDone}
            icon={
              <MaterialCommunityIcons 
                onPress={()=>setIsFeedbackDone(false)}
                name="close-circle-outline"
                size={24}
                color={appColors.iconActive}
                
              />
            }
            boldText={"Thanks for feedback!"}
          />
        )}
      </View>
    </View>
  );
};

export default FeedBack;

const styles = StyleSheet.create({
  container1: {
    flex: 1,
    backgroundColor: appColors.bgColor,
  },
  header: {
    flex: 0.1,
    paddingBottom: 10,
    alignItems: "flex-end",
    justifyContent: "center",
    flexDirection: "row",
    // height: height / 20,
    borderBottomWidth: 0.5,
    borderColor: appColors.borderColor,
    paddingVertical: 10,
    borderRadius: 25,
  },
  gradeConatiner: {
    flexDirection: "column",
    justifyContent: "center",
    marginVertical: 10,
    borderBottomWidth: 0.5,
    borderRadius: 25,
    borderColor: appColors.borderColor,
    paddingVertical: 10,
  },
  npsBar: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 15,
    marginBottom: 10,
  },
  txtInputContainer: {
    backgroundColor: appColors.bgColor,
    borderWidth: 1,
    borderColor: "grey",
    borderRadius: 10,
    height: 250,
    // width: width / 1.5,
    shadowColor: "#474747",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3,
    elevation: 10,
  },
  sendButtonStyle: {
    // flex: 1,
    // justifyContent: "center",
    // alignItems: "flex-end",
    width: 100,
    height: 100,
  },
  feedbackButton: {
    // flex:1,
    borderRadius: 5,
    backgroundColor: "grey",
    height: 50,
    width: 100,
    // flexDirection: "column",
    alignItems: "center",
    // paddingTop: 5,
    // marginTop: 15,
  },
  labelStyle: {
    marginLeft: 15,
    marginRight: "auto",
    marginBottom: -9,
    backgroundColor: appColors.bgColor,
    color: appColors.lableHeader,
    zIndex: 1000,
    paddingHorizontal: 3,
  },
  container: {
    backgroundColor: appColors.bgColor,
    borderWidth: 1,
    borderColor: "grey",
    borderRadius: 10,
    height: 250,
    // width: width / 1.5,
    shadowColor: "#474747",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3,
    elevation: 10,
  },
  thanksText: {
    paddingTop: 25,
    alignSelf: "center",
  },
});
