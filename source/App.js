import "react-native-gesture-handler";
import React from "react";
import { StatusBar } from "react-native";
import { Provider } from "react-redux";
import store from "./redux/store";
import AppNavigator from "./navigation";
import SplashScreen from "react-native-splash-screen";

console.disableYellowBox = true;

const App = () => {
  React.useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <Provider store={store}>
      <StatusBar backgroundColor={"transparent"} barStyle={"dark-content"} />
      <AppNavigator />
    </Provider>
  );
};

export default App;
