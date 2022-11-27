import React, {useState} from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import SignIn from '../screens/SignIn';
import SignUp from '../screens/SignUp';
import {
  HeaderBox,
  SelectBox,
  SelectIndicator,
  Subtitle,
  SubtitleBox,
  SubtitleButton,
  TitleText,
} from '../screens/SignIn/styles';
import {Text, View, TouchableOpacity, Image, Dimensions} from 'react-native';
import LogoQuad from '../../assets/logos/logoQuadrado.png';

function MyTabBar({state, descriptors, navigation, position}) {
  const {width, height} = Dimensions.get('window');

  return (
    <View style={{backgroundColor: 'white'}}>
     <HeaderBox>
        <Image source={LogoQuad} style={{height:height*0.25, width:width, marginTop: '13%'}} />
      </HeaderBox>
      <SubtitleBox style={{flexDirection: 'row'}}>
        {state.routes.map((route, index) => {
          const {options} = descriptors[route.key];
          const label =
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
              ? options.title
              : route.name;

          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              // The `merge: true` option makes sure that the params inside the tab screen are preserved
              navigation.navigate({name: route.name, merge: true});
            }
          };

          const onLongPress = () => {
            navigation.emit({
              type: 'tabLongPress',
              target: route.key,
            });
          };

          return (
            <SubtitleButton
              key={index}
              accessibilityRole="button"
              accessibilityState={isFocused ? {selected: true} : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              onPress={onPress}
              onLongPress={onLongPress}>
              <>
                <Subtitle active={isFocused}>{label}</Subtitle>
                {isFocused ? <SelectIndicator /> : <></>}
              </>
            </SubtitleButton>
          );
        })}
      </SubtitleBox>
    </View>
  );
}

export type RootStackParamList = {
  SignIn: undefined;
  SignUp: undefined;
};

const {Navigator, Screen} = createMaterialTopTabNavigator<RootStackParamList>();

export function AuthRoutes() {

  return (
    <>
      <HeaderBox></HeaderBox>
      <Navigator
        tabBar={props => <MyTabBar {...props} />}
        initialRouteName={'SignIn'}>
        <Screen
          name="SignIn"
          component={SignIn}
          options={{tabBarLabel: 'Entrar'}}
        />
        <Screen
          name="SignUp"
          component={SignUp}
          options={{tabBarLabel: 'Cadastrar'}}
        />
      </Navigator>
    </>
  );
}
