import React from 'react';

import Svg, { Path } from 'react-native-svg';
import appColors from '../appColor';

const FriendsSvg = (props) => {
  return (
    <Svg
      width="24"
      height="24"
      viewBox="0 0 481 353"
      fill="red"
      {...props}
    >
      <Path
        d="M136.996 176.894C176.761 176.894 208.996 144.658 208.996 104.894C208.996 65.1291 176.761 32.8936 136.996 32.8936C97.2318 32.8936 64.9963 65.1291 64.9963 104.894C64.9963 144.658 97.2318 176.894 136.996 176.894Z"
        fill={appColors.placeHolderColor}
      />
      <Path
        d="M218.996 216.894C190.836 202.594 159.756 196.894 136.996 196.894C92.4163 196.894 0.996338 224.234 0.996338 278.894V320.894H150.996V304.824C150.996 285.824 158.996 266.774 172.996 250.894C184.166 238.214 199.806 226.444 218.996 216.894Z"
        fill={appColors.placeHolderColor}
      />
      <Path
        d="M324.996 208.894C272.926 208.894 168.996 241.054 168.996 304.894V352.894H480.996V304.894C480.996 241.054 377.066 208.894 324.996 208.894Z"
        fill={appColors.placeHolderColor}
      />
      <Path
        d="M324.996 176.894C373.597 176.894 412.996 137.495 412.996 88.8936C412.996 40.2925 373.597 0.893585 324.996 0.893585C276.395 0.893585 236.996 40.2925 236.996 88.8936C236.996 137.495 276.395 176.894 324.996 176.894Z"
        fill={appColors.placeHolderColor}
      />
    </Svg>
  );
};
export default FriendsSvg;