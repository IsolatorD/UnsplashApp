import React from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { FeedScreen, ImageDetailScreen, UserProfileScreen } from "../screens";
import { AppNavigationParamList } from "../interfaces/navigation";

const Stack = createNativeStackNavigator<AppNavigationParamList>();

export default function AppNavigator () {

  return (
    <Stack.Navigator
      initialRouteName="Feed"
      screenOptions={{
        headerShown: false,
        animation: 'fade'
      }}
    >
      <Stack.Screen
        name="Feed"
        component={FeedScreen}
      />
      <Stack.Screen
        name="ImageDetail"
        component={ImageDetailScreen}
      />
      <Stack.Screen
        name="UserProfile"
        component={UserProfileScreen}
      />
    </Stack.Navigator>
  );
}