import React, { useState, useEffect } from "react";
import { Dimensions } from "react-native";
import { StyleSheet, Text, View, Modal } from "react-native";
import appColors from "../assets/appColor";
import { TouchableHighlight } from "react-native-gesture-handler";
import InputComponent from "./InputComponent";
import * as db from "../firestore/FirebaseUtils";
import ButtonComponent from "./ButtonComponent";


const ModalSendMailComponent = ({
  visible,
  onTouch,
  onChangeText,
  onCancel,
}) => {
  const [isFinish, setIsFinish] = useState(true);
  const [currentEmail, setCurrentEmail] = useState(false);
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [errorMessage, setErrorMesage] = useState("")
  const [isError, setIsError] = useState(false)

  useEffect(() => {
  }, [currentEmail]);



  const sendResetEmail = () => {
    db.auth
      .sendPasswordResetEmail(currentEmail)
      .then(() => {
        alert(`mail sended to ${currentEmail} `);
        setCurrentEmail("");
        setIsEmailValid(false);
        setIsFinish(false)

      })
      .catch((error) => { setErrorMesage(error); setIsError(true) })
  };

  return (
    <View style={styles.centeredView}>
      <Modal animationType="slide" transparent={true} visible={visible}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>

            <Text style={styles.modalText}>
              {"Please enter your registerd e-mail "}
            </Text>
            {isError && <Text style={[styles.modalText, {fontSize:12, color:"#fa8200"}]}>
              {`${errorMessage}`}
            </Text>}
            <InputComponent
            placeholder={"E-mail"}
              isLabel={false}
              editable={true}
              onChangeText={(email) => {
                setCurrentEmail(email);
              }}
              autoCapitalize="none"
              onEndEditing={() => setIsEmailValid(true)}
              clearTextOnFocus={true}
            />
                <ButtonComponent
                  style={[
                    styles.confirmButtons,
                    {
                      marginTop: 40,
                      paddingVertical: 5,
                      paddingHorizontal: 20,
                    },
                  ]}
                  disabled={!isEmailValid}
                  onTouch={() => sendResetEmail()}
                  children={
                    <Text style={{ fontSize: 16, fontWeight: "bold" }}>
                      send E-mail
                    </Text>
                  }
                />
            

            
            <ButtonComponent
              style={[
                styles.confirmButtons,
                { marginTop: 50, paddingVertical: 5, paddingHorizontal: 20 },
              ]}
              onTouch={onCancel}
              children={
                <Text style={{ fontSize: 16, fontWeight: "bold" }}>Cancel</Text>
              }
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};
export default ModalSendMailComponent;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    flexDirection: "column",
    alignItems: "center",
    marginTop: 22,
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
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  iconView: {
    left: 90,
    bottom: 35,
  },
  openButton: {
    backgroundColor: appColors.bgColor,
    borderRadius: 10,
    padding: 10,
    elevation: 2,
  },
  textStyle: {
    color: appColors.textColor,
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  confirmButtons: {
    backgroundColor: "white",
    marginTop: 20,
    borderColor: appColors.borderColor,
    borderWidth: 1,
    paddingHorizontal: 10,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});
