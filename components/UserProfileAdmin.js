import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList, Dimensions, RefreshControl, LogBox } from 'react-native';
import appColors from '../assets/appColor';
import * as db from '../firestore/FirebaseUtils';
import ButtonComponent from './ButtonComponent';
import Loading from './Loading';

export default function UserProfileAdmin() {
  const [documentData, setDocumentData] = useState([]);
  const [limit, setLimit] = useState(2);
  const [lastVisible, setLastVisible] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const { width, height } = Dimensions.get('window');

  useEffect(() => {
    handleFetchData();
    LogBox.ignoreLogs(['Setting a timer for a long period of time']);
  }, []);
  useEffect(()=>{},[handleDeleteUser])

  const handleFetchData = async () => {
    setIsLoading(true);

    let documentSnapshots = await db.db.collection('users').orderBy('uid').limit(limit).get();

    let documentDataTemp = documentSnapshots.docs.map((document) => document.data());

    setLastVisible(documentSnapshots.docs[documentSnapshots.docs.length - 1].id);

    setDocumentData(documentDataTemp);

    setIsLoading(false);
  };


  //REFAKT TO ONSNAPSHOT
  //ADD MODAL "DO U REALLY WANNA DELETE USER?"
  const handleFetchMore = async () => {
    if (documentData.length > 0) {
      setIsLoading(true);

      setRefreshing(true);

      let documentSnapshots = await db.db
        .collection('users')
        .orderBy('uid')
        .startAfter(lastVisible)
        .limit(limit)
        .get();
      if (documentSnapshots.docs.length > 0) {
        setLastVisible(documentSnapshots.docs[documentSnapshots.docs.length - 1].id);
        setDocumentData((current) => [
          ...current,
          ...documentSnapshots.docs.map((document) => document.data()),
        ]);
        setRefreshing(false);
      } else setIsLoading(false);
      return;
    }
  };
  const handleDeleteUser=(uid)=>{
    db.db.collection('users').doc(uid).delete()
  }

  const renderFooter = () => {
    if (isLoading) {
      return <Loading />;
    } else {
      return null;
    }
  };
  const renderHeader = () => {
    if (isLoading) {
      return <Loading />;
    } else {
      return null;
    }
  };

  const _renderItem = ({ item, index }) => (
    <View style={[styles.list, styles.shadoEffekt, { width: width / 1.1 }]}>
      <Text style={{ fontWeight: '600', marginBottom: 5, alignSelf: 'center' }}>{`customer ${
        index + 1
      }`}</Text>

      <View style={styles.listingGradeContainer}>
        <Text style={{ fontWeight: '500', marginBottom: 10 }}>{'Name: '}</Text>
        <Text style={{ fontWeight: 'bold', marginBottom: 10 }}>{item.name}</Text>

        <Text style={{ fontWeight: '500', marginBottom: 5 }}>{'Email: '}</Text>

        <Text style={{ fontWeight: 'bold' }}> {item.email}</Text>

        <Text style={{ fontWeight: '500', marginTop: 10 }}>{'Phone: '}</Text>
        <Text style={{ fontWeight: 'bold', marginTop: 5 }}>{item.phone}</Text>
        <Text style={{ fontWeight: '500', marginTop: 10 }}>{'Created: '}</Text>

        <Text style={{ fontWeight: 'bold', marginTop: 5 }}>{item.created}</Text>
      </View>
      <ButtonComponent
        style={{
          backgroundColor:appColors.bgFeedBack,
          height: 'auto',
          width: 'auto',
          alignSelf: 'flex-end',
          marginVertical: 10,
          borderRadius:14
        }}
        onTouch={()=>console.log(item.email)}
      >
        <Text style={{color:"white", fontWeight:"bold", padding:10}}>E-mail user</Text>
      </ButtonComponent>
      <ButtonComponent
        style={{
          backgroundColor:appColors.gradeColorRed,
          height: 'auto',
          width: 'auto',
          alignSelf: 'flex-end',
          marginVertical: 10,
          borderRadius:14
        }}
        onTouch={()=>handleDeleteUser(item.uid)}
      >
        <Text style={{color:"white", fontWeight:"bold", padding:10}}>Delete</Text>
      </ButtonComponent>
    </View>
  );
  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={documentData}
        renderItem={(item) => _renderItem(item)}
        keyExtractor={(item, index) => index.toString()}
        ListFooterComponent={renderFooter}
        onEndReached={handleFetchMore}
        onEndReachedThreshold={0.2}
        refreshing={refreshing}
        showsVerticalScrollIndicator={false}
        onScrollToTop={handleFetchData}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  list: {
    borderColor: appColors.iconInActive,
    borderWidth: 1,
    flexDirection: 'column',
    padding: 10,
    marginTop: 20,
    marginBottom: 20,
    marginLeft: 15,
    backgroundColor: 'white',
    borderRadius: 15,
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
  listingGradeContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
});
