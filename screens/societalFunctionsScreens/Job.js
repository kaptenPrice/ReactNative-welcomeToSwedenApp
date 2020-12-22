import React, { useState } from "react";
import {
  Dimensions,
  Linking,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import ChildComponent from "../../components/ChildComponent";
import Styles from "../../css/Styles";
import work_pic from "../../assets/images/work.jpg";
import appColors from "../../assets/appColor";

const Job = () => {
  const { width, height } = Dimensions.get("window");
  const [jobContentOne, setjobContentOne] = useState(
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
  );
  const [jobContentTwo, setjobContentTwo] = useState(
    "But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness. No one rejects, dislikes, or avoids pleasure itself, because it is pleasure, but because those who do not know how to pursue pleasure rationally encounter consequences that are extremely painful"
  );
  const [jobContentThree, setjobContentThree] = useState(
    "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo"
  );
  let phoneNumber = "0705083605";

  return (
    <ChildComponent
      scrollViewStyle={{ flex: 1, backgroundColor: appColors.bgChildComp }}
      iamgeViewStyle={{ flex: 1, width, height: height / 4 }}
      imageStyle={{ flex: 1, width: null, height: null }}
      imgSource={work_pic}
      firstContentStyle={Styles.childComponentContentView}
      children1={
        <Text style={Styles.childComponentHeaders}>Like a Swede:</Text>
      }
      children2={jobContentOne}
      // seeMoreText="more"
      seeMoreStyle={{ color: appColors.textColor }}
      backgroundColor={appColors.bgChildContainers}
      // seeLessText
      // seeLessStyle
      //wrapperStyle={{ paddingBottom: 35 }}
      // numberOfLines
      // customTextComponent
      style={Styles.childComponentTextContainers}
      secondContentView={Styles.childComponentContentView}
      children3={<Text style={Styles.childComponentHeaders}>Lingo</Text>}
      children4={
        <Text style={Styles.childComponentTextContainers}>{jobContentTwo}</Text>
      }
      thirdConentViewStyle={Styles.childComponentContentView}
      children5={
        <Text style={Styles.childComponentHeaders}>Assistance:</Text>
      }
      children6={
        <Text style={Styles.childComponentTextContainers}>
          {jobContentThree}
        </Text>
      }
      // children7={
      //   <View
      //     style={{
      //       display: "flex",
      //       flexDirection: "row",
      //       flex: 1,
      //       flexWrap: "wrap",
      //       margin: 10,
      //     }}
      //   >
      //     <Text>ADD </Text>
      //     <TouchableOpacity>
      //       <Text
      //         style={{ color: "darkblue" }}
      //         onPress={() => Linking.openURL("https://www.google.com")}
      //       >
      //         LINKS
      //       </Text>
      //     </TouchableOpacity>
      //     <Text> HERE.</Text>
      //     <Text onPress={() => Linking.openURL(`Tel:${phoneNumber}`)}>
      //       CALL UP
      //     </Text>
      //   </View>
      // }
    />
  );
};
export default Job;
