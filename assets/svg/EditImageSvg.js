import React from 'react';
import { Svg, Path } from 'react-native-svg';
import appColors from '../appColor';

const EditImageSvg = (props) => {
  return (
    <Svg
      width="20"
      height="20"
      style={{ left: 110, bottom: 140, opacity: 0.9 }}
      viewBox="0 0 84 80"
    >
      <Path
        d="M82.5833 47.5833L78.4167 51.75L70.0833 43.4167L74.25 39.25C74.6667 38.8333 75.0833 38.4167 75.9167 38.4167C76.3333 38.4167 77.1667 38.8333 77.5833 39.25L83 44.6667C83.4167 45.5 83.4167 46.75 82.5833 47.5833ZM42.1667 70.9167V79.6667H50.9167L76.3333 54.25L68 45.9167L42.1667 70.9167ZM34.7083 53.9583L26.5417 44.125L15.0833 58.8333H42.6667L53.25 48.625L46.1667 39.2083L34.7083 53.9583ZM33.8333 67.375L34.0417 67.1667H8.83333V8.83333H67.1667V35.125L75.5 27.0833V8.83333C75.5 4.25 71.7917 0.5 67.1667 0.5H8.83333C4.25 0.5 0.5 4.25 0.5 8.83333V67.1667C0.5 71.7917 4.25 75.5 8.83333 75.5H33.8333V67.375Z"
        fill={appColors.placeHolderColor}
      />
    </Svg>

  );
};
export default EditImageSvg;

