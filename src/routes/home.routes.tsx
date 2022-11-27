import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {MainTabRoutes} from './main.tab.routes';
import Home from '../screens/Home';
import InstitutionDetail from '../screens/InstitutionDetail';

export type HomeStackParamList = {
  Home: undefined;
  InstitutionDetail: undefined;
};

const {Navigator, Screen} = createStackNavigator<HomeStackParamList>();

export function HomeStack() {
  return (
    <Navigator
      initialRouteName="Home"
      screenOptions={{headerShown: false, gestureEnabled: false}}>
      <Screen name="Home" component={Home} />
      <Screen name="InstitutionDetail" component={InstitutionDetail} />
    </Navigator>
  );
}
