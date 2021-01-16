import React, {useState} from "react";
import { Dimensions } from "react-native";
import { StyleSheet, Text, View, Modal } from "react-native";
import appColors from "../assets/appColor";
import { MaterialIcons } from "@expo/vector-icons/";
import { TouchableHighlight } from "react-native-gesture-handler";

const AfterFeedback = ({ boldText, lightText, icon, visible }) => {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="fade"
        transparent={true}
        visible={visible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
          <Text style={styles.textStyle}>{icon}</Text>
            <Text style={styles.modalText}>{boldText}</Text>

            {/* <TouchableHighlight
              style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
              onPress={() => {
                setModalVisible(!modalVisible);
              }}
            >
        
            </TouchableHighlight> */}
          </View>
        </View>
      </Modal>

      {/* <TouchableHighlight
        style={styles.openButton}
        onPress={() => {
          setModalVisible(true);
        }}
      >
        <Text style={styles.textStyle}>Show Modal</Text>
      </TouchableHighlight> */}
    </View>
  );
  // const { height, width } = Dimensions.get("screen");
  // return (
  //   <View
  //     style={{
  //       flex: 1,
  //       flexDirection: "column",
  //       marginBottom: 10,
  //       backgroundColor: appColors.modal,
  //       borderRadius: 20,
  //     }}
  //   >
  //     <View
  //       style={{
  //         flex: 1,
  //         // margin: 20,
  //         backgroundColor: appColors.modal,
  //         borderRadius: 20,
  //         height: height / 10,
  //         width: width / 3,
  //         // padding: 35,
  //         alignItems: "center",
  //         shadowColor: "#000",
  //         shadowOffset: {
  //           width: 0,
  //           height: 2,
  //         },
  //         shadowOpacity: 0.25,
  //         shadowRadius: 3.84,
  //         elevation: 5,
      
  //       }}
  //     >
  //       <View style={{ alignSelf: "flex-end", marginBottom: 10 }}>{icon}</View>
  //       <Text
  //         style={{
  //           fontSize: 24,
  //           fontWeight: "bold",
  //           color: appColors.textColor,
  //         }}
  //       >
  //         {boldText}
  //       </Text>
  //       <Text
  //         style={{
  //           fontSize: 15,
  //           fontWeight: "400",
  //           color: appColors.textColor,
  //         }}
  //       >
  //         {lightText}
  //       </Text>
  //     </View>
  //   </View>
  // );
};

export default AfterFeedback;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  openButton: {
    backgroundColor: "#F194FF",
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  }
});
