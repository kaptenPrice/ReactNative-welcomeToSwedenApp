import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import ChildComponent from "../../components/ChildComponent";
import fika_pic from "../../assets/images/fika_pic.jpg";
import appColors from "../../assets/appColor";
import ButtonComponent from "../../components/ButtonComponent";
import { Ionicons, MaterialIcons, Feather } from "@expo/vector-icons";
import { TextInput } from "react-native-gesture-handler";
import ViewMoreText from "react-native-view-more-text";
import AdminButtons from "../../components/EditBox";
import * as db from "../../firestore/FirebaseUtils";
import ContentComponent from "../../components/ContentComponent";
import EditBox from "../../components/EditBox";

const Fika = () => {
  const dispatch = useDispatch();
  const { isAdmin } = useSelector((state) => state.userAdditionalInfo);
  const { currentUser } = useSelector((state) => state.authentication);

  const { width, height } = Dimensions.get("screen");
  const [isEditable, setIsEditable] = useState(false);
  const [contentOne, setContentOne] = useState("");
  const [contentTwo, setContentTwo] = useState("");
  const [contentThree, setContentThree] = useState("");

  useEffect(() => {
    getFieldData();
    // return () => {
    //   getFieldData();
    // };
  }, []);

  const getFieldData = () => {
    try {
      db.getContentData("social-life", "fika", "like-a-swede", (cb) => {
        const data = cb.data();
        !data?.content ? setContentOne("tomt") : setContentOne(data?.content);
      });
      db.getContentData("social-life", "fika", "lingo", (cb) => {
        const data = cb.data();
        !data?.content ? setContentTwo("tomt") : setContentTwo(data?.content);
      });
      db.getContentData("social-life", "fika", "price-level", (cb) => {
        const data = cb.data();
        !data?.content
          ? setContentThree("tomt")
          : setContentThree(data?.content);
      });
    } catch (error) {
      console.log(`contentOne ERROR: ${error}`);
    }
  };

  const handleEdit = () => {
    if (isEditable === false) {
      setIsEditable(true);
    } else {
      setIsEditable(false);
    }
  };
  const handleSaveContentOne = () => {
    try {
      db.handleSaveToDB("social-life", "fika", "like-a-swede", contentOne);
    } catch (error) {
      console.log(error);
    } finally {
      setIsEditable(false);
    }
  };
  const handleSaveContentTwo = () => {
    try {
      db.handleSaveToDB("social-life", "fika", "lingo", contentTwo);
    } catch (error) {
      console.log(error);
    } finally {
      setIsEditable(false);
    }
  };
  const handleSaveContentThree = () => {
    try {
      db.handleSaveToDB("social-life", "fika", "price-level", contentThree);
    } catch (error) {
      console.log(error);
    } finally {
    }
  };

  return (
    <ChildComponent
      scrollViewStyle={{ flex: 1, backgroundColor: appColors.bgColor }}
      iamgeViewStyle={{ flex: 1, width, height: height / 4 }}
      imageStyle={{ flex: 1, width: null, height: null }}
      imgSource={fika_pic}
      editButton1={
        isAdmin && (
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
      children1={<Text style={style.headers}>Like a Swede</Text>}
      children2={
        <Text style={style.childComponentTextContainers}>{contentOne}</Text>
      }
      editBox1={
        isEditable && (
          <EditBox
            editable={isEditable}
            onChangeText={(e) => setContentOne(e)}
            onTouch={()=>handleSaveContentOne()}
          />
        )
      }
      style={[style.childComponentTextContainers]}
      children3={<Text style={style.headers}>Lingo</Text>}
      children4={
        <Text style={style.childComponentTextContainers}>{contentTwo}</Text>
      }
      editBox2={
        isEditable && (
          <EditBox
            editable={isEditable}
            onChangeText={(e) => setContentTwo(e)}
            onTouch={()=>handleSaveContentTwo()}
          />
        )
      }
      children5={<Text style={style.headers}>Price level</Text>}
      children6={
        <Text style={style.childComponentTextContainers}>{contentThree}</Text>
      }
      editBox3={
        isEditable && (
          <EditBox
            editable={isEditable}
            onChangeText={(e) => setContentThree(e)}
            onTouch={handleSaveContentThree}
          />
        )
      }
    />
  );
};
export default Fika;
 const style = StyleSheet.create({
  headers: {
    fontSize: 24,
    fontWeight: "bold",
    marginLeft: 5,
  },
  childComponentTextContainers: {
    fontWeight: "500",
    fontSize: 15,
    paddingBottom: 30,
    marginLeft: 5,
    marginRight: 5,
    marginTop: 10,
    color: appColors.textColor,
    backgroundColor: appColors.bgColor,
  },
});
