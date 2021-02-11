import React, { useState, useEffect } from 'react';
import { Dimensions, Linking, Text, TouchableOpacity, View, StyleSheet } from 'react-native';
import ChildComponent from '../../components/ChildComponent';
// import study_unsplash from "../../assets/images/study_unsplash.jpg";
import appColors from '../../assets/appColor';
import { useSelector, useDispatch } from 'react-redux';
import ButtonComponent from '../../components/ButtonComponent';
import { TextInput } from 'react-native';
import * as db from '../../firestore/FirebaseUtils';
import EditBox from '../../components/EditBox';
import EditSvg from '../../assets/svg/EditSvg';


const job_pic = require('../../assets/images/job_unsplash.jpg');

const Job = () => {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.authentication);
  const { isAdmin } = useSelector((state) => state.userAdditionalInfo);

  const { width, height } = Dimensions.get('window');
  const [isEditable, setIsEditable] = useState(false);

  const [contentOne, setContentOne] = useState();
  const [contentTwo, setContentTwo] = useState();
  const [contentThree, setContentThree] = useState();
  const [phoneNumber, setPhoneNumber] = useState('0705083605'); //Testing call-function

  useEffect(() => {
    getFieldData();
  }, []);

  const getFieldData = () => {
    try {
      db.getContentData('societal-functions', 'job', 'like-a-swede', (cb) => {
        const data = cb.data();
        !data?.content ? setContentOne('tomt') : setContentOne(data?.content);
      });
      db.getContentData('societal-functions', 'job', 'lingo', (cb) => {
        const data = cb.data();
        !data?.content ? setContentTwo('tomt') : setContentTwo(data?.content);
      });
      db.getContentData('societal-functions', 'job', 'assistence', (cb) => {
        const data = cb.data();
        !data?.content ? setContentThree('tomt') : setContentThree(data?.content);
      });
    } catch (error) {
      alert(`contentOne ERROR: ${error}`);
    }
  };

  const handleEdit = () => {
    if (isEditable === false) {
      setIsEditable(true);
    } else {
      setIsEditable(false);
    }
  };
  const handleSaveStudyContentOne = () => {
    try {
      db.handleSaveToDB('societal-functions', 'job', 'like-a-swede', contentOne);
    } catch (error) {
      alert('getContent study: ', error);
    } finally {
      setIsEditable(false);
    }
  };
  const handleSaveStudyContentTwo = () => {
    try {
      db.handleSaveToDB('societal-functions', 'job', 'lingo', contentTwo);
    } catch (error) {
      alert(error);
    } finally {
      setIsEditable(false);
    }
  };
  const handleSavecontentThree = () => {
    try {
      db.handleSaveToDB('societal-functions', 'job', 'assistence', contentThree);
    } catch (error) {
      alert(error);
    } finally {
      setIsEditable(false);
    }
  };

  return (
    <ChildComponent
      scrollViewStyle={{ flex: 1, backgroundColor: appColors.bgColor }}
      iamgeViewStyle={{ flex: 1, width, height: height / 4 }}
      imageStyle={{ flex: 1, width: null, height: null }}
      imgSource={job_pic}
      editButton1={
        isAdmin && (
          <View>
            <ButtonComponent
              onTouch={handleEdit}
              style={{
                alignItems: 'center',
              }}
            >
              <EditSvg  />
            </ButtonComponent>
          </View>
        )
      }
      children1={<Text style={styles.headers}>Like a Swede:</Text>}
      children2={<Text style={styles.childComponentTextContainers}>{contentOne}</Text>}
      editBox1={
        isEditable && (
          <>
            <EditBox
              editable={isEditable}
              onChangeText={(e) => setContentOne(e)}
              onTouch={handleSaveStudyContentOne}
            />
          </>
        )
      }
      style={styles.childComponentTextContainers}
      children3={<Text style={styles.headers}>Lingo</Text>}
      children4={<Text style={styles.childComponentTextContainers}>{contentTwo}</Text>}
      editBox2={
        isEditable && (
          <>
            <EditBox
              editable={isEditable}
              onChangeText={(e) => setContentTwo(e)}
              onTouch={handleSaveStudyContentTwo}
            />
          </>
        )
      }
      children5={<Text style={styles.headers}>Assistance:</Text>}
      children6={<Text style={styles.childComponentTextContainers}>{contentThree}</Text>}
      editBox3={
        isEditable && (
          <>
            <EditBox
              editable={isEditable}
              onChangeText={(e) => setContentThree(e)}
              onTouch={handleSavecontentThree}
            />
          </>
        )
      }
      children7={
        <TouchableOpacity style={{ margin: 7, flexDirection: 'row' }}>
          <Text
            style={{ color: 'blue', marginRight: 10 }}
            onPress={() => Linking.openURL('https://www.google.com')}
          >
            google
          </Text>
          <Text
            style={{ color: 'blue', marginLeft: 10 }}
            onPress={() => Linking.openURL(`Tel:${phoneNumber}`)}
          >
            Call up
          </Text>
        </TouchableOpacity>
      }
      editBox4={
        isEditable && (
          <>
            <TextInput
              style={{
                borderWidth: 0.5,
                borderColor: 'red',
                width: width,
                height: height / 10,
              }}
              editable={isEditable}
              name="price-level"
              onChangeText={(e) => alert(e)}
            ></TextInput>
          </>
        )
      }
    />
  );
};
export default Job;

export const styles = StyleSheet.create({
  headers: {
    fontSize: 24,
    fontWeight: 'bold',
    // paddingBottom: 15,
    marginLeft: 5,
  },
  childComponentTextContainers: {
    // borderColor:"blue",
    // borderWidth:0.5,
    fontWeight: '500',
    fontSize: 15,
    paddingBottom: 30,
    marginLeft: 5,
    marginRight: 5,
    marginTop: 10,
    color: appColors.textColor,
    backgroundColor: appColors.bgColor,
  },
});
