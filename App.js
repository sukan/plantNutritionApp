import React from "react";
import { Provider } from "react-redux";
import { StyleSheet, Text, View } from "react-native";
import { mapping } from "@eva-design/eva";
import { ApplicationProvider } from "react-native-ui-kitten";
import { registerServices, serviceManager } from "./app/services/manager";
import { theme } from "./app/theme";

import RootScreen from "./app/containers/layouts/root";
import configureStore from "./app/store";

const settings = {
  api: {
    baseUrl: "https://nutrition-app-124.herokuapp.com",
  },
};

registerServices(settings);

const store = configureStore({}, serviceManager);

export default function App() {
  return (
    <ApplicationProvider mapping={mapping} theme={theme}>
      <Provider store={store}>
        <RootScreen />
      </Provider>
    </ApplicationProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
