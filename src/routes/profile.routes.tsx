import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {MainTabRoutes} from './main.tab.routes';
import Home from '../screens/Home';
import InstitutionDetail from '../screens/InstitutionDetail';
import Profile from '../screens/Profile';
import MyDonations from '../screens/MyDonations';
import MyNotifications from '../screens/MyNotifications';
import MyProfile from '../screens/MyProfile';
import ModeratorSolicitation from '../screens/ModeratorSolicitation';
import Suport from '../screens/Suport';
import ModeratorDone from '../screens/ModeratorDone';

export type HomeStackParamList = {
  MyDonations: undefined;
  MyNotifications: undefined;
  MyProfile: undefined;
  Profile: undefined;
  ModeratorSolicitation: undefined;
  ModeratorDone: undefined;
  Suport: undefined;
};

const {Navigator, Screen} = createStackNavigator<HomeStackParamList>();

export function ProfileStack() {
  return (
    <Navigator
      initialRouteName="Profile"
      screenOptions={{headerShown: false, gestureEnabled: false}}>
      <Screen name="Profile" component={Profile} />
      <Screen name="MyDonations" component={MyDonations} />
      <Screen name="MyNotifications" component={MyNotifications} />
      <Screen name="MyProfile" component={MyProfile} />
      <Screen name="ModeratorSolicitation" component={ModeratorSolicitation} />
      <Screen name="ModeratorDone" component={ModeratorDone} />
      <Screen name="Suport" component={Suport} />
    </Navigator>
  );
}
