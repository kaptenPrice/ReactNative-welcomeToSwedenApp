import React, { useState, useEffect } from "react";
import {
  Dimensions,
  Linking,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import ChildComponent from "../../components/ChildComponent";
import Styles from "../../css/Styles";
import study_unsplash from "../../assets/images/study_unsplash.jpg";
import appColors from "../../assets/appColor";
import { useSelector } from "react-redux";
import ButtonComponent from "../../components/ButtonComponent";
import { Ionicons, MaterialIcons, Feather } from "@expo/vector-icons";
import { TextInput } from "react-native";
import * as db from "../../firestore/FirebaseUtils";
import EditBox from "../../components/EditBox";

const Study = () => {
  const adminId = "KnlUK9tJpdRlvFV15ujBQogiR5k2";
  const { isLoading, currentUser } = useSelector(
    (state) => state.authentication
  );

  const { width, height } = Dimensions.get("screen");
  const [isEditable, setIsEditable] = useState(false);

  const [studyContentOne, setstudyContentOne] = useState();
  const [studyContentTwo, setstudyContentTwo] = useState();
  const [studyContentThree, setstudyContentThree] = useState();
  const [phoneNumber, setPhoneNumber] = useState("0705083605"); //Testing callup function

  useEffect(() => {
    const unsubscribe1 = db.getContentData(
      "societal-functions",
      "study",
      "like-a-swede",
      (cb) => {
        const data = cb.data();
        setstudyContentOne(JSON.stringify(data.content).slice(1, -1));
      }
    );
    const unsubscribe2 = db.getContentData(
      "societal-functions",
      "study",
      "lingo",
      (cb) => {
        const data = cb.data();
        setstudyContentTwo(JSON.stringify(data.content).slice(1, -1));
      }, 
      (err)=>{
        console.log(err)
      }
    );
    const unsubscribe3 = db.getContentData(
      "societal-functions",
      "study",
      "assistence",
      (cb) => {
        const data = cb.data();
        setstudyContentThree(JSON.stringify(data.content).slice(1, -1));
      }
    );
    return () => {
      unsubscribe1();
      unsubscribe2();
      unsubscribe3();
    };
  }, []);

  const handleEdit = () => {
    if (isEditable === false) {
      setIsEditable(true);
    } else {
      setIsEditable(false);
    }
  };
  const handleSaveStudyContentOne = () => {
    try {
      db.handleSaveToDB(
        "societal-functions",
        "study",
        "like-a-swede",
        studyContentOne
      );
    } catch (error) {
      console.log("getContent study: ", error);
    } finally {
      setIsEditable(false);
    }
  };
  const handleSaveStudyContentTwo = () => {
    try {
      db.handleSaveToDB(
        "societal-functions",
        "study",
        "lingo",
        studyContentTwo
      );
    } catch (error) {
      console.log(error);
    } finally {
      setIsEditable(false);
    }
  };
  const handleSaveStudyContentThree = () => {
    try {
      db.handleSaveToDB(
        "societal-functions",
        "study",
        "assistence",
        studyContentThree
      );
    } catch (error) {
      console.log(error);
    } finally {
      setIsEditable(false);
    }
  };

  return (
    <ChildComponent
      scrollViewStyle={{ flex: 1, backgroundColor: appColors.bgChildComp }}
      iamgeViewStyle={{ flex: 1, width, height: height / 4 }}
      imageStyle={{ flex: 1, width: null, height: null }}
      imgSource={study_unsplash}
      editButton1={
        adminId && (
          <View>
            <ButtonComponent
              onTouch={handleEdit}
              style={{
                alignItems: "center",
              }}
            >
              <MaterialIcons name="edit" size={30} color="black" />
            </ButtonComponent>
          </View>
        )
      }
      children1={
        <Text style={Styles.childComponentHeaders}>Like a Swede:</Text>
      }
      children2={
        <Text style={Styles.childComponentTextContainers}>
          {studyContentOne}
        </Text>
      }
      editBox1={
        isEditable && (
          <>
            <EditBox
              editable={isEditable}
              onChangeText={(e) => setstudyContentOne(e)}
              onTouch={handleSaveStudyContentOne}
            />
          </>
        )
      }
      style={Styles.childComponentTextContainers}
      children3={<Text style={Styles.childComponentHeaders}>Lingo</Text>}
      children4={
        <Text style={Styles.childComponentTextContainers}>
          {studyContentTwo}
        </Text>
      }
      editBox2={
        isEditable && (
          <>
            <EditBox
              editable={isEditable}
              onChangeText={(e) => setstudyContentTwo(e)}
              onTouch={handleSaveStudyContentTwo}
            />
          </>
        )
      }
      children5={<Text style={Styles.childComponentHeaders}>Assistance:</Text>}
      children6={
        <Text style={Styles.childComponentTextContainers}>
          {studyContentThree}
        </Text>
      }
      editBox3={
        isEditable && (
          <>
            <EditBox
              editable={isEditable}
              onChangeText={(e) => setstudyContentThree(e)}
              onTouch={handleSaveStudyContentThree}
            />
          </>
        )
      }
      children7={
        <TouchableOpacity style={{ margin: 7, flexDirection: "row" }}>
          <Text
            style={{ color: "blue", marginRight: 10 }}
            onPress={() => Linking.openURL("https://www.google.com")}
          >
            google
          </Text>
          <Text onPress={() => Linking.openURL(`Tel:${phoneNumber}`)}>
            Call up
          </Text>
        </TouchableOpacity>
      }
      editBox4={
        isEditable && (
          <>
            <TextInput
              style={{
                borderWidth: 0.5,
                borderColor: "red",
                width: width,
                height: height / 10,
              }}
              editable={isEditable}
              name="price-level"
              onChangeText={(e) => console.log(e)}
            ></TextInput>
          </>
        )
      }
    />
  );
};
export default Study;
