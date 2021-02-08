import React from 'react';
import { Svg, Path } from 'react-native-svg';
import appColors from '../appColor';

const MenuSvg = (props) => {
  return (
    <Svg
      width="50"
      height="50"
      viewBox="0 0 449 449"
      fill="none"
      {...props}

    >
      <Path
        d="M172.035 208.105H36.035C26.4872 208.105 17.3305 204.312 10.5792 197.561C3.82788 190.809 0.0350342 181.652 0.0350342 172.105V36.1047C0.0350342 26.5569 3.82788 17.4001 10.5792 10.6488C17.3305 3.89752 26.4872 0.104675 36.035 0.104675H172.035C181.583 0.104675 190.74 3.89752 197.491 10.6488C204.242 17.4001 208.035 26.5569 208.035 36.1047V172.105C208.035 181.652 204.242 190.809 197.491 197.561C190.74 204.312 181.583 208.105 172.035 208.105ZM412.035 208.105H276.035C266.487 208.105 257.331 204.312 250.579 197.561C243.828 190.809 240.035 181.652 240.035 172.105V36.1047C240.035 26.5569 243.828 17.4001 250.579 10.6488C257.331 3.89752 266.487 0.104675 276.035 0.104675H412.035C421.583 0.104675 430.74 3.89752 437.491 10.6488C444.242 17.4001 448.035 26.5569 448.035 36.1047V172.105C448.035 181.652 444.242 190.809 437.491 197.561C430.74 204.312 421.583 208.105 412.035 208.105ZM172.035 448.105H36.035C26.4872 448.105 17.3305 444.312 10.5792 437.561C3.82788 430.809 0.0350342 421.652 0.0350342 412.105V276.105C0.0350342 266.557 3.82788 257.4 10.5792 250.649C17.3305 243.898 26.4872 240.105 36.035 240.105H172.035C181.583 240.105 190.74 243.898 197.491 250.649C204.242 257.4 208.035 266.557 208.035 276.105V412.105C208.035 421.652 204.242 430.809 197.491 437.561C190.74 444.312 181.583 448.105 172.035 448.105ZM412.035 448.105H276.035C266.487 448.105 257.331 444.312 250.579 437.561C243.828 430.809 240.035 421.652 240.035 412.105V276.105C240.035 266.557 243.828 257.4 250.579 250.649C257.331 243.898 266.487 240.105 276.035 240.105H412.035C421.583 240.105 430.74 243.898 437.491 250.649C444.242 257.4 448.035 266.557 448.035 276.105V412.105C448.035 421.652 444.242 430.809 437.491 437.561C430.74 444.312 421.583 448.105 412.035 448.105Z"
        fill={appColors.placeHolderColor}
      />
    </Svg>
  );
};
export default MenuSvg;
