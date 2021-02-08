
import React from 'react';
import { Svg, Path } from 'react-native-svg';
import appColors from '../appColor';

const HospitalSvg = (props) => {
  return (
    <Svg width="24" height="24" viewBox="0 0 65 65">
      <Path
        d="M53.75 39.5833H39.5833V53.75H25.4167V39.5833H11.25V25.4167H25.4167V11.25H39.5833V25.4167H53.75V39.5833ZM57.2917 0.625H7.70833C3.77708 0.625 0.625 3.77708 0.625 7.70833V57.2917C0.625 59.1703 1.37128 60.972 2.69966 62.3003C4.02804 63.6287 5.82972 64.375 7.70833 64.375H57.2917C59.1703 64.375 60.972 63.6287 62.3003 62.3003C63.6287 60.972 64.375 59.1703 64.375 57.2917V7.70833C64.375 3.77708 61.1875 0.625 57.2917 0.625Z"
        fill={appColors.placeHolderColor}
      />
    </Svg>
  );
};
export default HospitalSvg;
