import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import ChildComponent from "../../components/ChildComponent";
import Styles from "../../css/Styles";
import fika_pic from "../../assets/images/fika_pic.jpg";
import appColors from "../../assets/appColor";
import ButtonComponent from "../../components/ButtonComponent";
import { Ionicons, MaterialIcons, Feather } from "@expo/vector-icons";
import { TextInput } from "react-native-gesture-handler";
import ViewMoreText from "react-native-view-more-text";
import firebase from "firebase/app";
import AdminButtons from "../../components/EditBox";
import * as db from "../../firestore/FirebaseUtils";
import useSwr from "swr";
import EditBox from "../../components/EditBox";
import ContentComponent from "../../components/ContentComponent";

const Fika = () => {
  // const adminId = "118005229206246600125";
  const adminId = "KnlUK9tJpdRlvFV15ujBQogiR5k2";
  const { isLoading, currentUser } = useSelector(
    (state) => state.authentication
  );

  const { width, height } = Dimensions.get("screen");
  const [isEditable, setIsEditable] = useState(false);
  const [fikaContentOne, setFikaContentOne] = useState("");
  const [fikaContentTwo, setFikaContentTwo] = useState("");
  const [fikaContentThree, setfikaContentThree] = useState("");
  

  useEffect(() => {
    db.getContentData(
      "welcome-to-sweden",
      "social-life",
      "fika",
      "like-a-swede"
    ).then((data) => {
      setFikaContentOne(JSON.stringify(data.content).slice(1, -1));
    });
    db.getContentData("welcome-to-sweden", "social-life", "fika", "lingo").then(
      (data) => {
        setFikaContentTwo(JSON.stringify(data.content).slice(1, -1));
      }
    );
    db.getContentData(
      "welcome-to-sweden",
      "social-life",
      "fika",
      "price-level"
    ).then((data) => {
      setfikaContentThree(JSON.stringify(data.content).slice(1, -1));
    });
  }, []);

  const _handleEdit = () => {
    if (isEditable === false) {
      setIsEditable(true);
    } else {
      setIsEditable(false);
    }
  };
  const handleSaveFikaContentOne = () => {
    try {
      db.handleSaveToDB(
        "welcome-to-sweden",
        "social-life",
        "fika",
        "like-a-swede",
        fikaContentOne
      );
    } catch (error) {
      console.log(error);
    } finally {
      // setIsEditable(false);
    }
  };
  const handleSaveFikaContentTwo = () => {
    try {
      db.handleSaveToDB(
        "welcome-to-sweden",
        "social-life",
        "fika",
        "lingo",
        fikaContentTwo
      );
    } catch (error) {
      console.log(error);
    } finally {
      // setIsEditable(false);
    }
  };
  const handleSaveFikaContentThree = () => {
    try {
      db.handleSaveToDB(
        "welcome-to-sweden",
        "social-life",
        "fika",
        "price-level",
        fikaContentThree
      );
    } catch (error) {
      console.log(error);
    } finally {
      // setIsEditable(false);
    }
  };

  return (
    <ChildComponent
      scrollViewStyle={{ flex: 1, backgroundColor: appColors.bgChildComp }}
      iamgeViewStyle={{ flex: 1, width, height: height / 4 }}
      imageStyle={{ flex: 1, width: null, height: null }}
      imgSource={fika_pic}
   
      editButton1={
        currentUser.uid === adminId && (
          <View>
            <ButtonComponent
              onTouch={_handleEdit}
              style={{
                alignItems: "center",
              }}
            >
              <MaterialIcons name="edit" size={30} color="black" />
            </ButtonComponent>
          </View>
        )
      }
      
      children1={<Text style={Styles.childComponentHeaders}>Like a Swede</Text>}
      children2={
        <Text style={Styles.childComponentTextContainers}>
          {fikaContentOne}
        </Text>
      }
      editBox1={
        isEditable && (
          <EditBox
            editable={isEditable}
            onChangeText={(e) => setFikaContentOne(e)}
            onTouch={handleSaveFikaContentOne}
          />
        )
      }
      style={[Styles.childComponentTextContainers]}
      children3={<Text style={Styles.childComponentHeaders}>Lingo</Text>}
      children4={
        <Text style={Styles.childComponentTextContainers}>
          {fikaContentTwo}
        </Text>
      }
      editBox2={
        isEditable && (
          <EditBox
          editable={isEditable}
          onChangeText={(e) => setFikaContentTwo(e)}
          onTouch={handleSaveFikaContentTwo}
        />
        )
      }
      children5={<Text style={Styles.childComponentHeaders}>Price level</Text>}
      children6={
        <Text style={Styles.childComponentTextContainers}>
          {fikaContentThree}
        </Text>
      }
      editBox3={
        isEditable && (
          <EditBox
          editable={isEditable}
          onChangeText={(e) => setfikaContentThree(e)}
          onTouch={handleSaveFikaContentThree}
        />
        )
      }
    />
  );
};
export default Fika;
