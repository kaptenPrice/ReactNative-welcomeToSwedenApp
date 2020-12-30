import React, { useState } from "react";
import { Ionicons, MaterialIcons, Feather } from "@expo/vector-icons";

import ButtonComponent from "../components/ButtonComponent";
import { View } from "react-native-animatable";

const AdminButtons = ({handleEdit, handleSave, ...props}) => {
  console.log("AdminButtons", handleEdit)
  
  return (
    <View>
      <ButtonComponent onTouch={handleEdit} {...props}>
        <MaterialIcons name="edit" size={30} color="black" />
      </ButtonComponent>
      <ButtonComponent
        onTouch={handleSave}
        style={{ marginLeft: 20 }}
        {...props}
      >
        <Feather name="save" size={30} color="black" />
      </ButtonComponent>
    </View>
  );
};

export default AdminButtons;
