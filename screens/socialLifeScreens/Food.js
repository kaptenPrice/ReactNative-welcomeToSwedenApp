import React, { useState } from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import ChildComponent from "../../components/ChildComponent";
import Styles from "../../css/Styles";
import food_pic from "../../assets/images/annie_unsplash.jpg";
import appColors from "../../assets/appColor";
// emma-unsplash.jpg

const Food = () => {
  const { width, height } = Dimensions.get("window");
  const [foodContentOne, setfoodContentOne] = useState(
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
  );
  const [foodContentTwo, setfoodContentTwo] = useState(
    "But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness. No one rejects, dislikes, or avoids pleasure itself, because it is pleasure, but because those who do not know how to pursue pleasure rationally encounter consequences that are extremely painful"
  );
  const [foodContentThree, setPriceContent] = useState(
    "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo"
  );

  return (
    <ChildComponent
      scrollViewStyle={{ flex: 1, backgroundColor: appColors.bgChildComp }}
      iamgeViewStyle={{ flex: 1, width, height: height / 4 }}
      imageStyle={{ flex: 1, width: null, height: null }}
      imgSource={food_pic}
      firstContentStyle={Styles.childComponentContentView}
      children1={
        <Text style={Styles.childComponentHeaders}>Like a Swede:</Text>
      }
      children2={foodContentOne}
      // seeMoreText="more"
      seeMoreStyle={{ color: appColors.textColor }}
      backgroundColor={appColors.bgChildContainers}
      // seeLessText
      // seeLessStyle
      // wrapperStyle
      // numberOfLines
      // customTextComponent
      style={Styles.childComponentTextContainers}
      secondContentView={Styles.childComponentContentView}
      children3={<Text style={Styles.childComponentHeaders}>Lingo:</Text>}
      children4={
        <Text style={Styles.childComponentTextContainers}>
          {foodContentTwo}
        </Text>
      }
      thirdConentViewStyle={Styles.childComponentContentView}
      children5={<Text style={Styles.childComponentHeaders}>Price level:</Text>}
      children6={
        <Text style={Styles.childComponentTextContainers}>
          {foodContentThree}
        </Text>
      }
    />
  );
};
export default Food;
