import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {AuthRoutes} from './auth.routes';
import {MainTabRoutes} from './main.tab.routes';
import {StatusBar} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type RootStackParamList = {
  Login: undefined;
  Main: undefined;
  Load: undefined;
};

const {Navigator, Screen} = createStackNavigator<RootStackParamList>();

//User AsyncStorage
export async function setUser(user) {
  const userString = JSON.stringify(user);
  await AsyncStorage.setItem('@user', userString);
}

export async function getUser() {
  const userValue = await AsyncStorage.getItem('@user');
  return userValue ? JSON.parse(userValue) : '';
}

export function Routes() {
  return (
    <NavigationContainer>
      <StatusBar
        barStyle={'dark-content'}
        translucent
        backgroundColor={'transparent'}
      />

      <Navigator
        initialRouteName="Login"
        screenOptions={{headerShown: false, gestureEnabled: false}}>
        <Screen name="Login" component={AuthRoutes} />
        <Screen name="Main" component={MainTabRoutes} />
      </Navigator>
    </NavigationContainer>
  );
}
