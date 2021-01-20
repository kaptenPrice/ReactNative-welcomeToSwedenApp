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
  const [userFeedback, setUserFeedback] = useState("");
  const [disable, setDisabled] = useState(true);
  const [isFeedbackDone, setIsFeedbackDone] = useState(false);

  useEffect(() => {
    setGrade(0);
  }, [isFeedbackDone]);

  const checkInputLength = () =>( 
     userFeedback.length == 0 || grade<0 ? setDisabled(true):setDisabled(false)
  )
 


  const sendFeedbackToDB = () => {
    setUserFeedback("");
    textInputRef.current.setNativeProps({ text: "" });
    dispatch(isSendingData(true));
    const data = {
      grade: grade,
      feedback: userFeedback,
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
        <View style={styles.headerContainer}>
          <Text style={styles.headerText}>FeedBack</Text>
        </View>
      </View>
      <View style={styles.gradeConatiner}>
        <View style={{ alignItems: "center" }}>
          <Text> How satisfied are you with this app? </Text>
        </View>
        <View style={styles.npsBar}>
          <NpsComponent value={grade} setValue={setGrade} />
        </View>
      </View>

      <View style={styles.container}>
        <View style={{ marginTop: 10 }}>
          <Text style={styles.labelStyle}>Feedback</Text>

          <TextInput
            style={[styles.txtInputContainer, { width: width / 1.2 }]}
            numberOfLines={0}
            multiline={true}
            onChangeText={(e) => setUserFeedback(e)}
            onEndEditing={checkInputLength}
            ref={textInputRef}
            blurOnSubmit={true}
          />
        </View>
        <View style={[styles.footerView, { width: width / 1.2 }]}>
          <ButtonComponent
            style={styles.sendButtonStyle}
            buttonStyle={[styles.feedbackButton, { width: width / 10 }]}
            onTouch={sendFeedbackToDB}
            disabled={disable}
          >
            <Ionicons  name="ios-send" color="white" size={30} />
          </ButtonComponent>
        </View>
        {isFeedbackDone && (
          <AfterFeedback
            visible={isFeedbackDone}
            onPress={() => setIsFeedbackDone(false)}
            presseableText={"OK"}
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
  headerContainer: {
    position: "absolute",
  },
  headerText: { fontSize: 35, fontWeight: "700", color: appColors.bgFeedBack },
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
  },
 
  feedbackButton: {
    borderRadius: 5,
    backgroundColor: "grey",
    height: "auto",
    alignItems: "center",
    paddingTop: 5,
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
    flex: 1,
    alignItems: "center",
    flexDirection: "column",
  },
  footerView: {
    flex: 1,
    alignItems: "flex-end",
    marginTop: 15,
  },

  thanksText: {
    paddingTop: 25,
    alignSelf: "center",
  },
});
