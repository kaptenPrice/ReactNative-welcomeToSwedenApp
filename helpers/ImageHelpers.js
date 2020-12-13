import * as Permission from "expo-permissions";
import * as ImagePicker from "expo-image-picker";
import { Platform } from "react-native";

export const openImageLibrary = async () => {
  const { status } = await Permission.askAsync(Permission.CAMERA_ROLL);
  if (status !== "granted") {
    alert("sorry no acess to camera from YOU");
    return false;
  } else {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [1, 1],
      base64: true,
    });
    return !result.cancelled ? result : false;
  }
};
export const openCamera = async () => {
  const { status } = await Permission.askAsync(
    Permission.CAMERA_ROLL,
    Permission.CAMERA
  );
  if (status !== "granted") {
    alert("sorry no acess to camera from YOU");
    return false;
  } else {
    const result = await ImagePicker.launchCameraAsync({
      quality: 0.1,
      base64: true,
      allowsEditing: Platform.OS == "ios" ? false : true,
      aspect: [4, 3],
    });
    return !result.cancelled ? result : false;
  }
};
export const prepareBlob = async (imageUrl) => {
  const blob = await new Promise((resolve, reject) => {
    //new request
    const xml = new XMLHttpRequest();
    //Succes resolved it
    xml.onload = function () {
      resolve(xml.response);
    };
    //Error Throw error
    xml.onerror = function (e) {
      console.log(e);
      reject(new TypeError("Image upload failed"));
    };

    //set the responseType to get BLOB
    xml.responseType = "blob";
    xml.open("GET", imageUrl, true);
    //Sen the request
    xml.send();
  });

  return blob;
};
