import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Foundation from 'react-native-vector-icons/Foundation';
import Feather from 'react-native-vector-icons/Feather';
import {RFValue} from 'react-native-responsive-fontsize';
import OpenSolicitation from '../screens/OpenSolicitation';
import DonateBox from '../../assets/icons/donate-box.svg';
import {HomeStack} from './home.routes';
import {ProfileStack} from './profile.routes';

export type RootStackParamList = {
  Home: undefined;
  OpenSolicitation: undefined;
  ProfileStack: undefined;
};

const {Navigator, Screen} = createBottomTabNavigator<RootStackParamList>();

export function MainTabRoutes() {
  return (
    <Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#036bb9',
        tabBarInactiveTintColor: '#a6a6a6',
        tabBarLabelStyle: {
          fontFamily: 'Poppins-Regular',
          fontSize: RFValue(12),
        },
      }}>
      <Screen
        name="Home"
        component={HomeStack}
        options={{
          headerShown: false,
          tabBarIcon: ({color}) => (
            <Foundation name={'home'} size={25} color={color} />
          ),
          tabBarLabel: 'Início',
        }}
      />
      <Screen
        name="OpenSolicitation"
        component={OpenSolicitation}
        options={{
          tabBarIcon: ({color}) => <DonateBox fill={color} />,
          tabBarLabel: 'Abrir solicitação',
        }}
      />
      <Screen
        name="ProfileStack"
        component={ProfileStack}
        options={{
          tabBarIcon: ({color}) => (
            <Feather name={'user'} size={25} color={color} />
          ),
          tabBarLabel: 'Perfil',
        }}
      />
    </Navigator>
  );
}
