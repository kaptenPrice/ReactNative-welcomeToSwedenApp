import React from 'react';
import { Svg, Path } from 'react-native-svg';
import appColors from '../appColor';
const EyeSvg = (props) => {


  return (

    <Svg
      viewBox="0 0 24 24"
      height="30"
      width="30"
      {...props}
    >
      <Path
        d="M1.3064 9.99762C1.3064 9.99762 5.3064 1.99762 12.3064 1.99762C19.3064 1.99762 23.3064 9.99762 23.3064 9.99762C23.3064 9.99762 19.3064 17.9976 12.3064 17.9976C5.3064 17.9976 1.3064 9.99762 1.3064 9.99762Z"
        stroke={appColors.placeHolderColor}
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      ></Path>
      <Path
        d="M12.3064 12.9976C13.9633 12.9976 15.3064 11.6545 15.3064 9.99762C15.3064 8.34077 13.9633 6.99762 12.3064 6.99762C10.6495 6.99762 9.3064 8.34077 9.3064 9.99762C9.3064 11.6545 10.6495 12.9976 12.3064 12.9976Z"
        stroke={appColors.placeHolderColor}
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      ></Path>
    </Svg>
  );
};

export default EyeSvg;

