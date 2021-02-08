

import React from 'react';
import { Svg, Path } from 'react-native-svg';
import appColors from '../appColor';

const ArrowRightSvg = (props) => {
    console.log("PROPS",props)
  return (
    <Svg width="30" height="30" viewBox="0 0 38 43" fill="none" {...props}>
      <Path
        d="M16.9517 29.8079H0.285034V13.1413H16.9517V0.641266L37.785 21.4746L16.9517 42.3079V29.8079ZM21.1184 11.0579V17.3079H4.4517V25.6413H21.1184V31.8913L31.535 21.4746L21.1184 11.0579Z"
        fill={appColors.placeHolderColor}
      />
    </Svg>
  );
};
export default ArrowRightSvg;
