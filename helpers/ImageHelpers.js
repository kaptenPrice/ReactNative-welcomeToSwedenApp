import * as Permission from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';
import * as MediaLibrary from 'expo-media-library';

import { Platform } from 'react-native';

export const openImageLibrary = async () => {
  if(Platform.OS!=="web"){
  const { status } = await MediaLibrary.requestPermissionsAsync();

  if (status !== 'granted') {
    alert('sorry no acess to camera from YOU');
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
}else{
  console.log("WebInterface dosnt allow this method [helpers/ImageHelpers/openImageLibrary]")
}
};
export const openCamera = async () => {
  const { status } = await Permission.askAsync(Permission.CAMERA_ROLL, Permission.CAMERA);

  if (status !== 'granted') {
    alert('sorry no acess to camera from YOU');
    return false;
  } else {
    const result = await ImagePicker.launchCameraAsync({
      quality: 0.1,
      base64: true,
      allowsEditing: Platform.OS == 'ios' ? false : true,
      aspect: [4, 3],
    });
    return !result.cancelled ? result : false;
  }
};

export const prepareBlob = async (imageUrl) => {
  const blob = await new Promise((resolve, reject) => {
    const xml = new XMLHttpRequest();

    xml.onload = function () {
      resolve(xml.response);
    };
    xml.onerror = function (e) {
      console.log(`Error från prepareBlob${e}`);
      reject(new TypeError('IMAGE UPLOAD FAILED'));
    };

    xml.responseType = 'blob';
    xml.open('GET', imageUrl, true);
    xml.send();
  });
  return blob;
};

// import * as Permission from 'expo-permissions';
// import * as ImagePicker from 'expo-image-picker';
// import * as MediaLibrary from 'expo-media-library';
// import { useState } from 'react';

// import { Platform } from 'react-native';

// export const openImageLibrary = async () => {
//   const { status } = await MediaLibrary.requestPermissionsAsync();

//   if (status !== 'granted') {
//     alert('sorry no acess to camera from YOU');
//     return false;
//   } else {
//     const result = await ImagePicker.launchImageLibraryAsync({
//       mediaTypes: ImagePicker.MediaTypeOptions.All,
//       allowsEditing: true,
//       aspect: [1, 1],
//       base64: true,
//     });
//     return !result.cancelled ? result : false;
//   }
// };
// export const openCamera = async () => {

//   if (Platform.OS === 'ios') {
//     const { status } = await ImagePicker.requestCameraPermissionsAsync();

//     if (status !== 'granted') {
//       alert('sorry no acess to camera from YOU');
//       return false;
//     }
//   } else {
//     const result = await ImagePicker.launchCameraAsync({
//       quality: 0.1,
//       base64: true,
//       allowsEditing: Platform.OS == 'ios' ? false : true,
//       aspect: [4, 3],
//     });
//   return !result.cancelled ? result : false;
//   }

// };

// export const prepareBlob = async (imageUrl) => {
//   const blob = await new Promise((resolve, reject) => {
//     const xml = new XMLHttpRequest();

//     xml.onload = function () {
//       resolve(xml.response);
//     };
//     xml.onerror = function (e) {
//       console.log(`Error från prepareBlob${e}`);
//       reject(new TypeError('IMAGE UPLOAD FAILED'));
//     };

//     xml.responseType = 'blob';
//     xml.open('GET', imageUrl, true);
//     xml.send();
//   });
//   return blob;
// };
