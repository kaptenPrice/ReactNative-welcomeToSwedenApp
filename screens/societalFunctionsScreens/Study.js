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
    db.getContentData(
      "welcome-to-sweden",
      "societal-functions",
      "study",
      "like-a-swede"
    ).then((data) => {
      setstudyContentOne(JSON.stringify(data.content).slice(1, -1));
    });
    db.getContentData(
      "welcome-to-sweden",
      "societal-functions",
      "study",
      "lingo"
    ).then((data) => {
      setstudyContentTwo(JSON.stringify(data.content).slice(1, -1));
    });
    db.getContentData(
      "welcome-to-sweden",
      "societal-functions",
      "study",
      "assistence"
    ).then((data) => {
      setstudyContentThree(JSON.stringify(data.content).slice(1, -1));
    });
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
        "welcome-to-sweden",
        "societal-functions",
        "study",
        "like-a-swede",
        studyContentOne
      );
      alert("Like a Swede uppdated");
    } catch (error) {
      console.log(error);
    }
  };
  const handleSaveStudyContentTwo = () => {
    try {
      db.handleSaveToDB(
        "welcome-to-sweden",
        "societal-functions",
        "study",
        "lingo",
        studyContentTwo
      );
      alert("Lingo uppdated");
    } catch (error) {
      console.log(error);
    }
  };
  const handleSaveStudyContentThree = () => {
    try {
      db.handleSaveToDB(
        "welcome-to-sweden",
        "societal-functions",
        "study",
        "assistence",
        studyContentThree
      );
      alert("assistence uppdated");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ChildComponent
      scrollViewStyle={{ flex: 1, backgroundColor: appColors.bgChildComp }}
      iamgeViewStyle={{ flex: 1, width, height: height / 4 }}
      imageStyle={{ flex: 1, width: null, height: null }}
      imgSource={study_unsplash}
      editButton1={
        currentUser.uid === adminId && (
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
