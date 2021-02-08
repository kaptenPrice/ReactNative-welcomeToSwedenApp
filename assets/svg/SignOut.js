

import React from 'react';
import { Svg, Path } from 'react-native-svg';
import appColors from '../appColor';


const SignOutSvg = (props) => {
  return (
 
<Svg
  stroke={appColors.placeHolderColor}
  fill={appColors.placeHolderColor}
  stroke-width="0"
  viewBox="0 0 16 16"
  height="26"
  width="26"
>
  <Path
    fill-rule="evenodd"
    d="M12 9V7H8V5h4V3l4 3-4 3zm-2 3H6V3L2 1h8v3h1V1c0-.55-.45-1-1-1H1C.45 0 0 .45 0 1v11.38c0 .39.22.73.55.91L6 16.01V13h4c.55 0 1-.45 1-1V8h-1v4z"
  ></Path>
</Svg>

  );
};
export default SignOutSvg

