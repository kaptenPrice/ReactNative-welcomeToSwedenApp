import React from 'react';
import { Svg, Path } from 'react-native-svg';
import appColors from '../appColor';



const MailSvg = (props) => {
  return (
    <Svg
      viewBox="0 0 24 24"
      height="30"
      width="30"
      {...props}
    >
      <Path d="M21 3C21 1.9 20.1 1 19 1H3C1.9 1 1 1.9 1 3M21 3V15C21 16.1 20.1 17 19 17H3C1.9 17 1 16.1 1 15V3M21 3L11 10L1 3" 
          stroke={appColors.placeHolderColor}
          stroke-width="100"
          stroke-linecap="round"
          stroke-linejoin="round"
      ></Path>
    </Svg>
  );
};

export default MailSvg;


