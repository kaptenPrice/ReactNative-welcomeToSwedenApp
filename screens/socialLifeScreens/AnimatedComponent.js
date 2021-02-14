import React, { useEffect, useRef, useState } from 'react';
import { Dimensions, StyleSheet, View, Animated, Image, FlatList, Text } from 'react-native';
// import { Easing,  withTiming } from 'react-native-reanimated';
// import Svg from 'react-native-svg';
import appColors from '../../assets/appColor';
// import AnimatedStroke from '../../components/AnimatedStroke';
import Axios from 'axios';
import { StatusBar } from 'expo-status-bar';

const images = [
  'https://images.unsplash.com/photo-1551316679-9c6ae9dec224?w=800&q=80',
  'https://images.unsplash.com/photo-1562569633-622303bafef5?w=800&q=80',
  'https://images.unsplash.com/photo-1503656142023-618e7d1f435a?w=800&q=80',
  'https://images.unsplash.com/photo-1555096462-c1c5eb4e4d64?w=800&q=80',
  'https://images.unsplash.com/photo-1517957754642-2870518e16f8?w=800&q=80',
  'https://images.unsplash.com/photo-1546484959-f9a381d1330d?w=800&q=80',
  'https://images.unsplash.com/photo-1548761208-b7896a6ff225?w=800&q=80',
  'https://images.unsplash.com/photo-1511208687438-2c5a5abb810c?w=800&q=80',
  'https://images.unsplash.com/photo-1548614606-52b4451f994b?w=800&q=80',
  'https://images.unsplash.com/photo-1548600916-dc8492f8e845?w=800&q=80',
];
const { width, height } = Dimensions.get('screen');
const ITEM_WiDTH = width * 0.76;
const ITEM_HEIGHT = ITEM_WiDTH * 1.47;

const data = images.map((image, index) => ({
  key: String(index),
  photo: image,
  // avatar_url: `https://randomuser.me/api/portraits/women/${Math.floor(Math.random() * 40)}.jpg`,
}));

const AnimatedComponent = () => {
  const [_images, setImages] = useState([]);
 
  useEffect(() => {
    async function getpics() {
      const pics = await Axios.get(process.env.API_URL).then((res) => {
        setImages(res.data.results);
      });
    }
    getpics();
  }, []);

  const scrollX = useRef(new Animated.Value(0)).current;
  console.log(scrollX);

  return (
    <View style={styles.view}>
      <StatusBar hidden />

      <Animated.FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }], {
          useNativeDriver: true,
        })}
        pagingEnabled
        data={data}
        keyExtractor={(item) => item.key}
        renderItem={({ item, index }) => {
          const inputRange = [(index - 1) * width, index * width, (index + 1) * width];

          const translateX = scrollX.interpolate({
            inputRange,
            outputRange: [-width * 0.7, 0, width * 0.7],
          });

          return (
            <View style={{ width, justifyContent: 'center', alignItems: 'center' }}>
              <View
                style={{
                  borderRadius: 18,
                  shadowColor: '#000',
                  shadowOpacity: 0.4,
                  shadowRadius: 30,
                  shadowOffset: { width: 0, height: 0 },
                  borderRadius: 18,
                  padding: 12,
                  backgroundColor: 'white',
                }}
              >
                <View
                  style={{
                    width: ITEM_WiDTH,
                    height: ITEM_HEIGHT,
                    overflow: 'hidden',
                    alignItems: 'center',
                    borderRadius: 14,
                  }}
                >
                  <Animated.Image
                    source={{ uri: item.photo }}
                    style={{
                      width: ITEM_WiDTH * 1.4,
                      height: ITEM_HEIGHT,
                      resizeMode: 'cover',
                      transform: [{ translateX }],
                    }}
                  />
                </View>
                {/* <Image
                  source={{ uri: item.avatar_url }}
                  style={{
                    width: 60,
                    height: 60,
                    borderRadius: 60,
                    borderWidth: 6,
                    borderColor: 'white',
                    position: 'absolute',
                    bottom: -30,
                    right: 60,
                  }}
                /> */}
              </View>
            </View>
          );
        }}
      />
    </View>
  );
};

export default AnimatedComponent;

const styles = StyleSheet.create({
  view: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonView: {},
});
