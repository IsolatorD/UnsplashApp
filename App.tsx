import React from "react";
import { SafeAreaView, StatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import AppNavigator from './src/navigation/app';
import { Provider } from 'react-redux';
import { store } from "./src/store";
import { ImagesProvider } from "./src/context/images";

import colors from "./src/constants/colors";

export default function App () {
  return (
    <SafeAreaView
      style={{ flex: 1 }}
    >
      <StatusBar
        barStyle="light-content"
        backgroundColor={colors.secondary}
      />
      <Provider
        store={store}
      >
        <ImagesProvider>
          <NavigationContainer>
            <AppNavigator />
          </NavigationContainer>
        </ImagesProvider>
      </Provider>
    </SafeAreaView>
  )
}