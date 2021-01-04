import React from "react";
import { Feather } from "@expo/vector-icons";

import ButtonComponent from "./ButtonComponent";
import { View } from "react-native-animatable";
import { TextInput } from "react-native-gesture-handler";
import { Dimensions } from "react-native";

const EditBox = ({
  handleEdit,
  handleSave,
  onTouch,
  editable,
  onChangeText,
  ...props
}) => {
  const { width, height } = Dimensions.get("screen");

  return (
    <View style={{ flexDirection: "row" }}>
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
        // style={{ borderColor: "green", borderWidth: 1 }}
      >
        <Feather name="save" size={24} color="black" />
      </ButtonComponent>
    </View>
  );
};

export default EditBox;
