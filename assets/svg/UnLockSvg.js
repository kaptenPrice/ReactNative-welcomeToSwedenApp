import React from 'react';
import { Svg, Path } from 'react-native-svg';
import appColors from '../appColor';

const UnLockSvg = (props) => {
  return (
    <Svg
    width="20"
    height="22"
    viewBox="0 0 352 480"
      style={{ position: 'absolute', marginLeft: 260, marginTop: 9 }}
    >
      <Path
       d="M288 176H112V96C112 79.0261 118.743 62.7475 130.745 50.7452C142.747 38.7428 159.026 32 176 32C192.974 32 209.252 38.7428 221.255 50.7452C233.257 62.7475 240 79.0261 240 96C240 100.243 241.686 104.313 244.686 107.314C247.687 110.314 251.757 112 256 112C260.243 112 264.313 110.314 267.314 107.314C270.314 104.313 272 100.243 272 96C272 70.5392 261.886 46.1212 243.882 28.1177C225.879 10.1143 201.461 0 176 0C150.539 0 126.121 10.1143 108.118 28.1177C90.1143 46.1212 80 70.5392 80 96V176H64C47.0318 176.019 30.7639 182.767 18.7656 194.766C6.76732 206.764 0.0185286 223.032 0 240V416C0.0185286 432.968 6.76732 449.236 18.7656 461.234C30.7639 473.233 47.0318 479.981 64 480H288C304.968 479.981 321.236 473.233 333.234 461.234C345.233 449.236 351.981 432.968 352 416V240C351.981 223.032 345.233 206.764 333.234 194.766C321.236 182.767 304.968 176.019 288 176Z"
       fill={appColors.unlock}
      />
    </Svg>
    // <Svg
    //   width="19"
    //   height="19"
    //   viewBox="0 0 19 19"
    //   style={{ position: 'absolute', marginLeft: 260, marginTop: 9 }}
    // >
    //   <Path
    //     d="M11.3511 6.14185L12.2911 7.08185L3.21114 16.1418H2.29114V15.2218L11.3511 6.14185ZM14.9511 0.141846C14.7011 0.141846 14.4411 0.241846 14.2511 0.431846L12.4211 2.26185L16.1711 6.01185L18.0011 4.18185C18.3911 3.79185 18.3911 3.14185 18.0011 2.77185L15.6611 0.431846C15.4611 0.231846 15.2111 0.141846 14.9511 0.141846ZM11.3511 3.33185L0.291138 14.3918V18.1418H4.04114L15.1011 7.08185L11.3511 3.33185Z"
    //     fill={appColors.unlock}
    //     {...props}
    //   />
    // </Svg>
  );
};
export default UnLockSvg;
