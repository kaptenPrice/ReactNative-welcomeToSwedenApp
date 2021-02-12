import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList, Dimensions, RefreshControl, LogBox } from 'react-native';
import appColors from '../assets/appColor';
import * as db from '../firestore/FirebaseUtils';
import Loading from './Loading';

export default function UserProfileAdmin() {
  const [documentData, setDocumentData] = useState([]);
  const [limit, setLimit] = useState(10);
  const [lastVisible, setLastVisible] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const { width, height } = Dimensions.get('window');

  useEffect(() => {
    handleFetchData();
    LogBox.ignoreLogs(['Setting a timer for a long period of time']);

    
  }, []);

  const handleFetchData = async () => {

    setIsLoading(true);

    let documentSnapshots = await db.db.collection('users').orderBy('uid').limit(limit).get();

    let documentData = documentSnapshots.docs.map((document) => document.data());

    // setDocumentData(documentSnapshots.docs.map((document) => document.data()));

    const lastVisible = documentData[documentData.length - 1].uid;
    // console.log('lastVisible i getFeedback', lastVisible);
    setLastVisible(lastVisible);

    setDocumentData(documentData);
  };

  const handleGetMoreData = async () => {
    setRefreshing(true);

    let documentSnapshots = await db.db
      .collection('users')
      .orderBy('uid')
      .startAfter(lastVisible)
      .limit(limit)
      .get();

    const lastVisible = documentSnapshots[documentSnapshots.docs.length - 1].uid;

    setLastVisible(lastVisible);

    setDocumentData((current) => [
      ...current,
      ...documentSnapshots.docs.map((document) => document.data()),
    ]);

    setRefreshing(false);
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
      <Text style={{ fontWeight: '500' }}>{`User: ${index + 1}`}</Text>

      <Text style={{ fontWeight: '500', marginLeft: 5 }}>{'Name: '}</Text>
      <View style={{ marginTop: 10 }}>
        <Text style={{ fontSize: 14 }}>{item.name}</Text>
      </View>
      <View style={styles.listingGradeContainer}>
        <Text style={{ fontWeight: '500' }}>{'Email: '}</Text>

        <Text style={{ fontWeight: 'bold' }}> {item.email}</Text>

        <Text style={{ fontWeight: '500', marginTop: 10 }}>{'Phone: '}</Text>
        <Text style={{ fontWeight: 'bold', marginTop: 5 }}>{item.phone}</Text>
        <Text style={{ fontWeight: '500', marginTop: 10 }}>{'Created: '}</Text>
        <Text style={{ fontWeight: 'bold', marginTop: 5 }}>
          {/* {item.created.toDate().toUTCString().substring(0, 26)} */}
        </Text>
      </View>
    </View>
  );
  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={documentData}
        renderItem={(item) => _renderItem(item)}
        keyExtractor={(item, index) => index.toString()}
        ListFooterComponent={renderFooter}
        // onEndReached={handleGetMoreData}
        // onEndReachedThreshold={0}
        refreshing={refreshing}
        showsVerticalScrollIndicator={false}
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
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginVertical: 10,
    marginLeft: 5,
  },
});
