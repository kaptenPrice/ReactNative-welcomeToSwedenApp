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
import AdminButtons from "../../components/AdminButtonsComponent";
// import {db, auth, storage} from "../../firestore/FirebaseUtils"

const Fika = () => {
  const db = firebase.firestore();


  // const likeASwedeDummie =
  //   "Fika is the famous SwedisFika is the famous Swedish word for "
  // const lingoDummie =
  //   " Bulle : cinnamon bum \n påtår: refillBulle : cinnamon bum \n påtår: refill Bulle : cinnamon bum \n påtår: refillBulle : cinnamon bum \n påtår: refill";
  // const prirceLevelDummie =
  //   "Fika for one person costs between 40-60 kr, Fika for one person costs between 40-60 kr, Fika for one person costs between 40-60 kr, Fika for one person costs between 40-60 kr";
  // const adminId = "118005229206246600125";
  const adminId = "KnlUK9tJpdRlvFV15ujBQogiR5k2";
  const { isLoading, currentUser } = useSelector(
    (state) => state.authentication
  );

  // console.log(`adminID: ${adminId}, currenUserUid: ${currentUser.uid}`)
  const { width, height } = Dimensions.get("screen");
  const [isEditable, setIsEditable] = useState(false);
  const [fikaContentOne, setFikaContentOne] = useState("");
  const [fikaContentTwo, setFikaContentTwo] = useState("");
  const [fikaContentThree, setfikaContentThree] = useState("");
  // useEffect(() => {
  //   setFikaContentOne(likeASwedeDummie);
  //   setFikaContentTwo(lingoDummie);
  //   setfikaContentThree(prirceLevelDummie);
  // }, []);

  const _handleEdit = () => {
    console.log("HandleEdit");

    setIsEditable(true);
  };
  const _handleSave = () => {
    db.collection("welcome-to-sweden")
      .doc("social-life")
      .collection("fika")
      .doc("like-a-swede")
      .set({like_a_swede: fikaContentOne});
    //TODO update
    setIsEditable(false);
  };
  // console.log(isEditable);

  return (
    <ChildComponent
      scrollViewStyle={{ flex: 1, backgroundColor: appColors.bgChildComp }}
      iamgeViewStyle={{ flex: 1, width, height: height / 4 }}
      imageStyle={{ flex: 1, width: null, height: null }}
      imgSource={fika_pic}
      children1={<Text style={Styles.childComponentHeaders}>Like a Swede</Text>}
      editButton1={
        currentUser.uid === adminId && (
          <AdminButtons handleEdit={_handleEdit} handleSave={_handleSave} />
        )
      }
      children2={<Text>{fikaContentOne}</Text>}
      editBox1={
        isEditable && (
          <>
            <TextInput
              style={{
                borderWidth: 0.5,
                borderColor: "red",
                width: width,
                height: height / 10,
              }}
              placeholder="Update content"
              editable={isEditable}
              name="like-a-swede"
              onChangeText={(e) => setFikaContentOne(e)}
            ></TextInput>
          </>
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
          <>
            <TextInput
              style={{
                borderWidth: 0.5,
                borderColor: "red",
                width: width,
                height: height / 10,
              }}
              placeholder="Update content"
              editable={isEditable}
              name="lingo"
              onChangeText={(e) => setFikaContentTwo(e)}
            ></TextInput>
          </>
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
          <>
            <TextInput
              style={{
                borderWidth: 0.5,
                borderColor: "red",
                width: width,
                height: height / 10,
              }}
              placeholder="Update content"
              editable={isEditable}
              name="price-level"
              onChangeText={(e) => setfikaContentThree(e)}
            ></TextInput>
          </>
        )
      }
    />
  );
};
export default Fika;
