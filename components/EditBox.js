import React from "react";
import { Feather } from "@expo/vector-icons";

import ButtonComponent from "./ButtonComponent";
import { View } from "react-native-animatable";
import { TextInput } from "react-native-gesture-handler";
import { Dimensions } from "react-native";
import appColors from "../assets/appColor";

const EditBox = ({
  handleEdit,
  handleSave,
  onTouch,
  editable,
  onChangeText,
  ...props
}) => {
  const { width, height } = Dimensions.get("window");

  return (
    <View style={{ flexDirection: "row", marginTop:20, marginLeft:10 }}>
      <TextInput
        style={{
          flex: 1,
          borderWidth: 0.5,
          borderColor: "grey",
          width: width,
          height: height / 10,
          
        }}
        placeholder="Update content"
        editable={editable}
        onChangeText={onChangeText}
      />
      <ButtonComponent
        onTouch={onTouch}
        style={{  marginHorizontal:7,marginTop:20 }}
      >
        <Feather name="save" size={24} color={appColors.buttonActive} />
      </ButtonComponent>
    </View>
  );
};

export default EditBox;
