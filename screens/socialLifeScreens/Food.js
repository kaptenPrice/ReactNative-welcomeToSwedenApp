import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import ChildComponent from '../../components/ChildComponent';
import appColors from '../../assets/appColor';
import ButtonComponent from '../../components/ButtonComponent';
import { TextInput } from 'react-native-gesture-handler';
import AdminButtons from '../../components/EditBox';
import * as db from '../../firestore/FirebaseUtils';
import EditBox from '../../components/EditBox';
import EditSvg from '../../assets/svg/EditSvg';

const food_pic = require('../../assets/images/food-unsplash.jpg');

const Food = () => {
  const { isAdmin } = useSelector((state) => state.userAdditionalInfo);
  const { currentUser } = useSelector((state) => state.authentication);

  const { width, height } = Dimensions.get('window');
  const [isEditable, setIsEditable] = useState(false);
  const [contentOne, setContentOne] = useState('');
  const [contentTwo, setContentTwo] = useState('');
  const [contentThree, setContentThree] = useState('');

  useEffect(() => {
    getFieldData();
    // return () => {
    //   getFieldData();
    // };
  }, []);

  const getFieldData = () => {
    try {
      db.getContentData('social-life', 'food', 'like-a-swede', (cb) => {
        const data = cb.data();
        !data?.content ? setContentOne('tomt') : setContentOne(data?.content);
      });
      db.getContentData('social-life', 'food', 'lingo', (cb) => {
        const data = cb.data();
        !data?.content ? setContentTwo('tomt') : setContentTwo(data?.content);
      });
      db.getContentData('social-life', 'food', 'price-level', (cb) => {
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
  const handleSaveContentOne = () => {
    try {
      db.handleSaveToDB('social-life', 'food', 'like-a-swede', contentOne);
    } catch (error) {
      alert(error);
    } finally {
      setIsEditable(false);
    }
  };
  const handleSaveContentTwo = () => {
    try {
      db.handleSaveToDB('social-life', 'food', 'lingo', contentTwo);
    } catch (error) {
      alert(error);
    } finally {
      setIsEditable(false);
    }
  };
  const handleSaveContentThree = () => {
    try {
      db.handleSaveToDB('social-life', 'food', 'price-level', contentThree);
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
      imgSource={food_pic}
      editButton1={
        isAdmin && (
          <View>
            <ButtonComponent
              onTouch={() => handleEdit()}
              style={{
                alignItems: 'center',
              }}
            >
              <EditSvg />
            </ButtonComponent>
          </View>
        )
      }
      children1={<Text style={style.headers}>Like a Swede</Text>}
      children2={<Text style={style.childComponentTextContainers}>{contentOne}</Text>}
      editBox1={
        isEditable && (
          <EditBox
            editable={isEditable}
            onChangeText={(e) => setContentOne(e)}
            onTouch={handleSaveContentOne}
          />
        )
      }
      style={[style.childComponentTextContainers]}
      children3={<Text style={style.headers}>Lingo</Text>}
      children4={<Text style={style.childComponentTextContainers}>{contentTwo}</Text>}
      editBox2={
        isEditable && (
          <EditBox
            editable={isEditable}
            onChangeText={(e) => setContentTwo(e)}
            onTouch={handleSaveContentTwo}
          />
        )
      }
      children5={<Text style={style.headers}>Price level</Text>}
      children6={<Text style={style.childComponentTextContainers}>{contentThree}</Text>}
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
export default Food;

const style = StyleSheet.create({
  headers: {
    fontSize: 24,
    fontWeight: 'bold',
    marginLeft: 5,
  },
  childComponentTextContainers: {
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
