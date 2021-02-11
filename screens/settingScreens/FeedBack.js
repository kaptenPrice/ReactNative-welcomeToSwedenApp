import React, { useState, useEffect, useRef } from "react";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import {
  View,
  Text,
  Button,
  Dimensions,
  TextInput,
  StyleSheet,
  RefreshControl,
  LogBox, Keyboard, FlatList, TouchableOpacity, TouchableWithoutFeedback
} from "react-native";
import Styles from "../../css/Styles";
import {
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons/";

import * as db from "../../firestore/FirebaseUtils";
import appColors from "../../assets/appColor";
import ButtonComponent from "../../components/ButtonComponent";
import NpsComponent from "../../components/NpsComponent";
import AfterFeedback from "../../components/AfterFeedback";
import ReadMore from "react-native-read-more-text";
import Loading from "../../components/Loading";


const FeedBack = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const textInputRef = useRef("");
  const { width, height } = Dimensions.get("window");

  const { name, email, phone, city, uid, isAdmin } = useSelector(
    (state) => state.userAdditionalInfo
  );

  const { currentUser } = useSelector((state) => state.authentication);
  const [grade, setGrade] = useState(0);
  const [userFeedback, setUserFeedback] = useState("");
  const [adminFeedback, setAdminFeedback] = useState([]);
  const [currentPage, setCurrentPage] = useState(5);

  const [disable, setDisabled] = useState(true);
  const [isFeedbackDone, setIsFeedbackDone] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [isMoreLoading, setIsMoreLoading] = useState(false);
  const [lastDoc, setLastDoc] = useState(null);
  let onEndReachedCalledDuringMomentum = false;
  const feedbackRef = db.db.collection("user-feedback");

  useEffect(() => {
    handleGetFeedback();
    checkInputLength()
    LogBox.ignoreLogs(['Setting a timer for a long period of time'])


    setGrade(0);
  }, [isFeedbackDone]);

  const checkInputLength = () =>
    userFeedback.length == 0 || grade < 0
      ? setDisabled(true)
      : setDisabled(false);

  const sendFeedbackToDB = () => {
    setUserFeedback("");
    textInputRef.current.setNativeProps({ text: "" });

    const data = {
      grade: grade,
      feedback: userFeedback,
      from: email,
      created: new Date(),
    };
    try {
      db.handleSaveFeedback("feedback", data);
    } catch (error) {
      alert(error);
    } finally {
      setIsFeedbackDone(true);
    }
  };

  const handleGetFeedback = async () => {
    setIsLoading(true);

    const snapShot = await feedbackRef.orderBy("feedbackId").limit(5).get();

    if (!snapShot.empty) {
      let newFeedback = [];

      setLastDoc(snapShot.docs[snapShot.docs.length - 1]);

      for (let i = 0; i < snapShot.docs.length; i++) {
        newFeedback.push(snapShot.docs[i].data());
      }

      setAdminFeedback(newFeedback);
    } else {
      setLastDoc(null);
    }
    setIsLoading(false);
  };

  const handleGetMore = async () => {
    if (lastDoc) {
      setIsMoreLoading(true);

      setTimeout(async () => {
        let snapshot = await feedbackRef
          .orderBy("feedbackId")
          .startAfter(lastDoc.data().feedbackId)
          .limit(5)
          .get();

        if (!snapshot.empty) {
          let newFeedback = adminFeedback;

          setLastDoc(snapshot.docs[snapshot.docs.length - 1]);

          for (let i = 0; i < snapshot.docs.length; i++) {
            newFeedback.push(snapshot.docs[i].data());
          }

          setAdminFeedback(newFeedback);
          if (snapshot.docs.length < 3) setLastDoc(null);
        } else {
          setLastDoc(null);
        }

        setIsMoreLoading(false);
      }, 1000);
    }

    onEndReachedCalledDuringMomentum = true;
  };

  const _renderItem = ({ item }) => (
    <View style={[styles.list, { width: width / 1.1 }]}>
      <Text>{"Feedback: "}</Text>

      <ReadMore>{item.feedback}</ReadMore>

      <View style={styles.listingGradeContainer}>
        <Text>{"Grade: "}</Text>
        <Text>{item.grade}</Text>
        <Text>{"From: "}</Text>
        <Text>{item.from}</Text>
      </View>
    </View>
  );

  const onRefresh = () => {
    handleGetFeedback();
  };

  const renderFooter = () => {
    if (!isMoreLoading) {
      return true;
    }
    return <Loading />;
  };

  return (
    <View style={styles.container}>
      {!isAdmin ? (
        <>
          <View style={styles.gradeConatiner}>
            <View style={{ alignItems: "center" }}>
              <Text> How satisfied are you with this app? </Text>
            </View>
            <View style={styles.npsBar}>
              <NpsComponent value={grade} setValue={setGrade} />
            </View>
          </View>

          <View style={styles.container2}>
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()} >
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
                  placeholder={disable?"Please give us som feedback":null}
                />
              </View>
            </TouchableWithoutFeedback>
            <View style={[styles.footerView, { width: width / 1.2 }]}>
              <ButtonComponent
                buttonStyle={[styles.feedbackButton, { width: width / 5 }]}
                onTouch={() => sendFeedbackToDB()}
                disabled={disable}
              >
                <Text style={{color:"white"}}>Send</Text>
              </ButtonComponent>
            </View>
            {isFeedbackDone && (
              <AfterFeedback
                visible={isFeedbackDone}
                onPress={() => { setIsFeedbackDone(false), navigation.navigate("Home") }}
                presseableText={"OK"}
                boldText={"Thanks!"}
              />
            )}
          </View>
        </>
      ) : (
          <>
            {/* ADMIN VIEW */}
            <View style={{ flex: 1 }}>
              <FlatList
                data={adminFeedback}
                keyExtractor={(item, index) => index.toString()}
                renderItem={(item) => _renderItem(item)}
                ListFooterComponent={renderFooter}
                refreshControl={
                  <RefreshControl refreshing={isLoading} onRefresh={onRefresh} />
                }
                initialNumToRender={3}
                onEndReachedThreshold={0.1}
                onMomentumScrollBegin={() => {
                  onEndReachedCalledDuringMomentum = false;
                }}
                onScrollEndDrag={() => {
                  if (!onEndReachedCalledDuringMomentum && !isMoreLoading) {
                    handleGetMore();
                  }
                }}
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
    alignItems: "flex-end",
    justifyContent: "center",
    flexDirection: "row",
    borderBottomWidth: 0.5,
    borderColor: appColors.borderColor,
    paddingVertical: 10,
    borderRadius: 25,
  },
  headerContainer: {
    position: "absolute",
  },
  headerText: { fontSize: 35, fontWeight: "700", color: appColors.textColor },
  gradeConatiner: {
    flexDirection: "column",
    justifyContent: "center",
    marginVertical: 10,
    borderBottomWidth: 0.5,
    borderRadius: 25,
    borderColor: appColors.borderColor,
    paddingVertical: 10,
  },
  npsBar: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 15,
    marginBottom: 10,
  },
  txtInputContainer: {
    backgroundColor: appColors.bgColor,
    borderWidth: 1,
    borderColor: "grey",
    borderRadius: 10,
    height: 250,
    shadowColor: "#474747",
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
    backgroundColor: "grey",
    height: "auto",
    alignItems: "center",
    padding: 5,
  },
  labelStyle: {
    marginLeft: 15,
    marginRight: "auto",
    marginBottom: -9,
    backgroundColor: appColors.bgColor,
    color: appColors.lableHeader,
    zIndex: 1000,
    paddingHorizontal: 3,
  },
  container: {
    flex: 1,
    alignItems: "center",
    flexDirection: "column",
  },
  container2: {
    flex: 1,
    alignItems: "center",
    flexDirection: "column",
    marginTop: 60
  },
  footerView: {
    flex: 1,
    alignItems: "flex-end",
    marginTop: 25,
  },

  thanksText: {
    paddingTop: 25,
    alignSelf: "center",
  },
  list: {
    borderColor: appColors.iconInActive,
    borderWidth: 1,
    flexDirection: "column",
    paddingHorizontal: 10,
    marginTop: 20,
    marginBottom: 20,
  },
  listingGradeContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 10,
  },
});
