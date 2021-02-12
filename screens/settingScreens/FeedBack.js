import React, { useState, useEffect, useRef } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import {
  View,
  Text,
  Button,
  Dimensions,
  TextInput,
  StyleSheet,
  RefreshControl,
  LogBox,
  Keyboard,
  FlatList,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
import Styles from '../../css/Styles';

import * as db from '../../firestore/FirebaseUtils';
import appColors from '../../assets/appColor';
import ButtonComponent from '../../components/ButtonComponent';
import NpsComponent from '../../components/NpsComponent';
import AfterFeedback from '../../components/AfterFeedback';
import ReadMore from 'react-native-read-more-text';
import Loading from '../../components/Loading';

const FeedBack = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const textInputRef = useRef('');
  const { width, height } = Dimensions.get('window');

  const { name, email, phone, city, uid, isAdmin } = useSelector(
    (state) => state.userAdditionalInfo
  );

  const { currentUser } = useSelector((state) => state.authentication);
  const [grade, setGrade] = useState(0);
  const [userFeedback, setUserFeedback] = useState('');

  const [disable, setDisabled] = useState(true);
  const [isFeedbackDone, setIsFeedbackDone] = useState(false);

  const [isMoreLoading, setIsMoreLoading] = useState(false);

  useEffect(() => {
    checkInputLength();
    LogBox.ignoreLogs(['Setting a timer for a long period of time']);

    setGrade(0);
  }, [isFeedbackDone]);

  const checkInputLength = () =>
    userFeedback.length == 0 || grade < 0 ? setDisabled(true) : setDisabled(false);

  const sendFeedbackToDB = () => {
    setUserFeedback('');
    textInputRef.current.setNativeProps({ text: '' });

    const data = {
      grade: grade,
      feedback: userFeedback,
      from: email,
      created: new Date(),
    };
    try {
      db.handleSaveFeedback('feedback', data);
    } catch (error) {
      alert(error);
    } finally {
      setIsFeedbackDone(true);
    }
  };

  const [documentData, setDocumentData] = useState([]);
  const [limit, setLimit] = useState(3);
  const [lastVisible, setLastVisible] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    handleFetchData();
  }, []);

  const handleFetchData = async () => {
    console.log('start handleFetchData');

    setIsLoading(true);

    let documentSnapshots = await db.db
      .collection('user-feedback')
      .orderBy('created', 'desc')
      .limit(limit)
      .get();

    setLastVisible(documentSnapshots.docs[documentSnapshots.docs.length - 1]);

    let documentData = documentSnapshots.docs.map((document) => document.data());

    // setDocumentData(documentSnapshots.docs.map((document) => document.data()));

    /*let lastVisible = documentData[documentData.length - 1].feedbackId;
    console.log('lastVisible i getFeedback', lastVisible);*/

    setDocumentData(documentData);
  };

  const handleFetchMore = async () => {
    setRefreshing(true);

    let documentSnapshots = await db.db
      .collection('user-feedback')
      .orderBy('created', 'desc')
      .startAfter(lastVisible)
      .limit(limit)
      .get();
    if (documentSnapshots.docs.length > 0) {
      setLastVisible(documentSnapshots.docs[documentSnapshots.docs.length - 1]);

      setDocumentData((current) => [
        ...current,
        ...documentSnapshots.docs.map((document) => document.data()),
      ]);

      setRefreshing(false);
    } else setIsLoading(false);
    return;
  };

  const renderFooter = () => {
    if (isLoading) {
      return <Loading />;
    } else {
      return null;
    }
  };

  const _renderItem = ({ item, index }) => (
    <View style={[styles.list, styles.shadoEffekt, { width: width / 1.1 }]}>
      <Text style={{ fontWeight: '500' }}>{'Feedback: '}</Text>
      <View style={{ marginVertical: 10 }}>
        <ReadMore>
          <Text style={{ fontSize: 18 }}>{item.feedback}</Text>
        </ReadMore>
      </View>
      <View style={styles.listingGradeContainer}>
        <Text style={{ fontWeight: '500' }}>{'Grade: '}</Text>
        {item.grade >= 7 ? (
          <Text style={{ color: appColors.gradeColorGreen, fontWeight: 'bold' }}>{item.grade}</Text>
        ) : (
          <Text style={{ color: appColors.gradeColorRed, fontWeight: 'bold' }}> {item.grade}</Text>
        )}

        <Text style={{ fontWeight: '500', marginTop: 10 }}>{'From: '}</Text>
        <Text style={{ fontWeight: 'bold', marginTop: 5 }}>{item.from}</Text>
        <Text style={{ fontWeight: '500', marginTop: 10 }}>{'Created: '}</Text>
        <Text style={{ fontWeight: 'bold', marginTop: 5 }}>
          {item.created.toDate().toUTCString().substring(0, 26)}
        </Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {!isAdmin ? (
        <>
          <View style={styles.gradeConatiner}>
            <View style={{ alignItems: 'center' }}>
              <Text> How satisfied are you with this app? </Text>
            </View>
            <View style={styles.npsBar}>
              <NpsComponent value={grade} setValue={setGrade} />
            </View>
          </View>

          <View style={styles.container2}>
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
              <View style={{ marginTop: 30 }}>
                <Text style={styles.labelStyle}>Feedback</Text>

                <TextInput
                  style={[styles.txtInputContainer, { width: width / 1.2 }]}
                  numberOfLines={0}
                  multiline={true}
                  onChangeText={(e) => setUserFeedback(e)}
                  onEndEditing={() => checkInputLength()}
                  ref={textInputRef}
                  blurOnSubmit={true}
                  placeholder={disable ? 'Please give us som feedback' : null}
                />
              </View>
            </TouchableWithoutFeedback>
            <View style={[styles.footerView, { width: width / 1.2 }]}>
              <ButtonComponent
                buttonStyle={[styles.feedbackButton, { width: width / 5 }]}
                onTouch={() => sendFeedbackToDB()}
                disabled={disable}
              >
                <Text style={{ color: 'white' }}>Send</Text>
              </ButtonComponent>
            </View>
            {isFeedbackDone && (
              <AfterFeedback
                visible={isFeedbackDone}
                onPress={() => {
                  setIsFeedbackDone(false), navigation.navigate('Home');
                }}
                presseableText={'OK'}
                boldText={'Thanks!'}
              />
            )}
          </View>
        </>
      ) : (
        <>
          {/* ADMIN VIEW */}
          <View style={{ flex: 1 }}>
            <FlatList
              data={documentData}
              renderItem={(item) => _renderItem(item)}
              keyExtractor={(item, index) => index.toString()}
              ListFooterComponent={renderFooter}
              onEndReached={handleFetchMore}
              onEndReachedThreshold={0}
              refreshing={refreshing}
              showsVerticalScrollIndicator={false}
            />
          </View>
        </>
      )}
    </View>
  );
};

export default FeedBack;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: appColors.bgColor,
  },
  header: {
    flex: 0.1,
    paddingBottom: 10,
    alignItems: 'flex-end',
    justifyContent: 'center',
    flexDirection: 'row',
    borderBottomWidth: 0.5,
    borderColor: appColors.borderColor,
    paddingVertical: 10,
    borderRadius: 25,
  },
  headerContainer: {
    position: 'absolute',
  },
  headerText: { fontSize: 35, fontWeight: '700', color: appColors.textColor },
  gradeConatiner: {
    flexDirection: 'column',
    justifyContent: 'center',
    marginVertical: 10,
    borderBottomWidth: 0.5,
    borderRadius: 25,
    borderColor: appColors.borderColor,
    paddingVertical: 10,
  },
  npsBar: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 15,
    marginBottom: 10,
  },
  txtInputContainer: {
    backgroundColor: appColors.bgColor,
    borderWidth: 1,
    borderColor: 'grey',
    borderRadius: 10,
    height: 250,
    shadowColor: '#474747',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3,
    elevation: 10,
    height: 250,
    paddingTop: 20,
    paddingLeft: 20,
  },

  feedbackButton: {
    borderRadius: 12,
    backgroundColor: 'grey',
    height: 'auto',
    alignItems: 'center',
    padding: 5,
  },
  labelStyle: {
    marginLeft: 15,
    marginRight: 'auto',
    marginBottom: -9,
    backgroundColor: appColors.bgColor,
    color: appColors.lableHeader,
    zIndex: 1000,
    paddingHorizontal: 3,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
  },
  container2: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    marginTop: 60,
  },
  footerView: {
    flex: 1,
    alignItems: 'flex-end',
    marginTop: 25,
  },

  thanksText: {
    paddingTop: 25,
    alignSelf: 'center',
  },
  list: {
    borderColor: appColors.iconInActive,
    borderWidth: 1,
    flexDirection: 'column',
    padding: 10,
    marginTop: 20,
    marginBottom: 20,
    backgroundColor: 'white',
    borderRadius: 15,
  },
  listingGradeContainer: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginVertical: 10,
    marginLeft: 5,
  },
  headerText: {
    fontFamily: 'System',
    fontSize: 36,
    fontWeight: '600',
    color: '#000',
    marginLeft: 12,
    marginBottom: 12,
  },
  shadoEffekt: {
    shadowColor: '#474747',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3,
    elevation: 10,
  },
});
