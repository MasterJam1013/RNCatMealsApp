import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import * as Font from "expo-font";
import AppLoading from "expo-app-loading";
import MealsNavigator from "./navigation/MealsNavigator";
import { enableScreens } from "react-native-screens";
import { createStore, combineReducers } from "redux";
import mealsReducer from "./store/reducers/meals";
import { Provider } from "react-redux";


// render OS specific best screen performance
enableScreens();

// in larger apps use combine reducer for multiple reducers takes JS object and maps the obj to specific keys
const rootReducer = combineReducers({
  meals: mealsReducer
});
//create store using redux, takes a reducer to pass
const store = createStore(rootReducer);

//function outside of main function component to fetch custom fonts, doesn't need to be recreated for every component cycle. LoadAsync, 'name': require(relative path) returns a promise
const fetchFonts = () => {
  return Font.loadAsync({
    "open-sans": require("./assets/fonts/OpenSans-Regular.ttf"),
    "open-sans-bold": require("./assets/fonts/OpenSans-Bold.ttf"),
  });
};

const App = (props) => {
  //Manage state
  // font loaded state. If font not loaded return app loading, startAsync points at operation when first rendered(fetchFonts), must be a function and returns a promise, when finished set font loaded to true
  const [fontLoaded, setFontLoaded] = useState(false);
  if (!fontLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => setFontLoaded(true)}
        onError={(err) => console.log(err)}
      />
    );
  }
  // wrap provider around root app component, takes one prop (store) which will equal store component
  return <Provider store={store}>
    <MealsNavigator />
  </Provider>;
};

export default App;
