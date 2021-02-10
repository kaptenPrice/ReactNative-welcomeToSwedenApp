import React from 'react';
import { Svg, Path } from 'react-native-svg';
import appColors from '../appColor';

const FeedbackSvg = (props) => {
  return (
    <Svg
      stroke={appColors.placeHolderColor}
      fill={appColors.placeHolderColor}
      stroke-width="0"
      viewBox="0 0 22 22"
      height="26"
      width="26"
      {...props}
    >
      <Path
        d="M10.3235 14.117C11.0135 14.39 11.6435 14.753 12.2105 15.2045C12.7775 15.6545 13.262 16.1795 13.6655 16.7735C14.4885 17.9721 14.9317 19.3906 14.9375 20.8445V21.5H13.625V20.843C13.6278 20.0672 13.4761 19.2987 13.1786 18.5822C12.8812 17.8657 12.444 17.2157 11.8925 16.67C11.3513 16.1364 10.7148 15.709 10.016 15.41C9.28981 15.0989 8.50808 14.9381 7.71802 14.9375C6.94225 14.9347 6.1737 15.0864 5.45722 15.3839C4.74074 15.6814 4.09069 16.1186 3.54502 16.67C3.01161 17.2114 2.58425 17.8479 2.28502 18.5465C1.97602 19.2575 1.82002 20.024 1.81252 20.843V21.5H0.500025V20.843C0.496188 19.3881 0.940297 17.9672 1.77202 16.7735C2.60047 15.5783 3.76369 14.6546 5.11552 14.1185C4.80842 13.9075 4.52877 13.6591 4.28302 13.379C4.04019 13.1033 3.83028 12.8003 3.65752 12.476C3.48545 12.152 3.35444 11.8079 3.26752 11.4515C3.17889 11.0885 3.1311 10.7167 3.12502 10.343C3.12502 9.7085 3.24502 9.113 3.48502 8.5595C3.95431 7.46288 4.82769 6.58896 5.92403 6.119C6.48963 5.87823 7.09775 5.75325 7.71246 5.75144C8.32718 5.74964 8.93602 5.87105 9.50302 6.1085C10.5999 6.57814 11.4739 7.4521 11.9435 8.549C12.3319 9.46236 12.4145 10.4768 12.179 11.441C12.089 11.7965 11.957 12.1385 11.78 12.467C11.6042 12.7921 11.3945 13.0978 11.1545 13.379C10.9145 13.6595 10.637 13.904 10.3235 14.117ZM7.71802 13.625C8.16952 13.625 8.59402 13.5395 8.99002 13.37C9.77517 13.0364 10.4001 12.4109 10.733 11.6255C10.9115 11.222 11 10.7945 11 10.3445C11.0019 9.91497 10.9176 9.48942 10.7519 9.09313C10.5862 8.69683 10.3426 8.33785 10.0355 8.0375C9.7318 7.74133 9.37778 7.50159 8.99002 7.3295C8.58992 7.1508 8.15621 7.05976 7.71802 7.0625C7.26802 7.0625 6.84353 7.148 6.44753 7.3175C5.65805 7.65423 5.02925 8.28303 4.69252 9.0725C4.52302 9.4685 4.43752 9.893 4.43752 10.3445C4.43752 10.7945 4.52302 11.219 4.69252 11.615C4.86502 12.011 5.09752 12.3605 5.39152 12.6605C5.69588 12.9681 6.05856 13.2118 6.45831 13.3774C6.85805 13.543 7.28683 13.6272 7.71952 13.625H7.71802ZM21.5 0.5V11H18.875L14.9375 14.9375V11H13.625V9.6875H16.25V11.7695L18.332 9.6875H20.1875V1.8125H7.06252V4.1705C6.84252 4.1983 6.62342 4.23281 6.40552 4.274C6.1821 4.31642 5.96277 4.37815 5.75002 4.4585V0.5H21.5Z"
        fill={appColors.placeHolderColor}
      ></Path>
    </Svg>
  );
};
export default FeedbackSvg;
