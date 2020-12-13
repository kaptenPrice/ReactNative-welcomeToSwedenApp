import React from "react";

import { Provider } from "react-redux";
import {firebaseConfig} from "./config/config"
import firebase  from "firebase/app"
import reduxStore from "./redux/store/";
import WelcomeToSwedenNavigation from "./WelcomeToSwedenNavigation";

if(!firebase.apps.lenght){
  firebase.initializeApp(firebaseConfig)
}

export default function App() {
  return (
    <Provider store={reduxStore}>
      <WelcomeToSwedenNavigation />
    </Provider>
  );
}
