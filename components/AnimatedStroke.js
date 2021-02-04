import React, { useRef, useState } from 'react';
import { View } from 'react-native-animatable';
import Animated from 'react-native-reanimated';

import { Path } from 'react-native-svg';

// const AnimatedPath = Animated.createAnimatedComponent(Path);
const AnimatedPath = Animated.createAnimatedComponent(Path)

const colors = ['#FFC27A', '#7EDAB9', '#56A6E5', '#FE8777'];

const AnimatedStroke = ({ d, progress }) => {
  const [length, setlength] = useState(0);
  // const ref = useRef(null);
  const ref = useRef(null);

  const strokeAnimation = useAnimatedProps(() => ({
    strokeDashOffset: length - length * progress.value,
  }));

  return (
    <View></View>
    
  )
}

export default AnimatedStroke
