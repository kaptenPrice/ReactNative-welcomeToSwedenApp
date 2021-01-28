import React from "react";

import { Provider } from "react-redux";
import {firebaseConfig} from "./config/config"
// import firebase  from "firebase/app"
import reduxStore from "./redux/store/";
import WelcomeToSwedenNavigation from "./WelcomeToSwedenNavigation";



export default function App() {
  return (
    <Provider store={reduxStore}>
      <WelcomeToSwedenNavigation />
    </Provider>
  );
}
