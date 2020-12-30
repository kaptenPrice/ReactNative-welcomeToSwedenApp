import React, { useState } from "react";
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


const Study = () => {
  const adminId = "118005229206246600125";
  const { isLoading, currentUser } = useSelector(
    (state) => state.authentication
  );

  const { width, height } = Dimensions.get("screen");
  const [isEditable, setIsEditable] = useState(false);

  const [studyContentOne, setstudyContentOne] = useState();
  const [studyContentTwo, setstudyContentTwo] = useState();
  const [studyContentThree, setstudyContentThree] = useState();
  const [phoneNumber, setPhoneNumber] = useState("0705083605"); //Testing callup function

  const handleEdit = () => {
    setIsEditable(true);
  };
  const handleSave = () => {
    //TODO update
    setIsEditable(false);
  };

  return (
    <ChildComponent
    
      scrollViewStyle={{ flex: 1, backgroundColor: appColors.bgChildComp }}
      iamgeViewStyle={{ flex: 1, width, height: height / 4 }}
      imageStyle={{ flex: 1, width: null, height: null }}
      imgSource={study_unsplash}
     adminButtonStyle={{position:"relative",marginRight:20, flexDirection:"row", justifyContent:"flex-end"}}
      editButton1={
        currentUser.id === adminId && (
          <>
            <ButtonComponent onTouch={handleEdit}>
              <MaterialIcons name="edit" size={30} color="black" />
            </ButtonComponent>
            <ButtonComponent style={{ marginLeft: 20 }} onTouch={handleSave}>
              <Feather name="save" size={30} color="black" />
            </ButtonComponent>
            
          </>
        )
      }
      children1={
        <Text style={Styles.childComponentHeaders}>Like a Swede:</Text>
      }
      
      children2={studyContentOne}
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
              editable={isEditable}
              name="like-a-swede"
              onChangeText={(e) => setstudyContentOne(e)}
            ></TextInput>
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
            <TextInput
              style={{ borderWidth: 0.5, borderColor: "red", width: width,
              height: height / 10, }}
              editable={isEditable}
              name="lingo"
              onChangeText={(e) => setstudyContentTwo(e)}
            ></TextInput>
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
            <TextInput
              style={{ borderWidth: 0.5, borderColor: "red", width: width,
              height: height / 10,}}
              editable={isEditable}
              name="price-level"
              onChangeText={(e) => setstudyContentThree(e)}
            ></TextInput>
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
              style={{ borderWidth: 0.5, borderColor: "red", width: width,
              height: height / 10,}}
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
