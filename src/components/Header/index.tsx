import React from 'react';
import {TextInputProps} from 'react-native';
import AntDesgin from 'react-native-vector-icons/AntDesign';

import {BackBoxButton, BackIconBox, BackText} from './styles';

interface Props {
  title: string;
  onBackPress: () => void;
  marginTop?: string;
}

export function Header({title, onBackPress, marginTop, ...rest}: Props) {
  return (
    <BackBoxButton onPress={onBackPress} marginTop={marginTop}>
      <BackIconBox>
        <AntDesgin name="arrowleft" size={25} color="black" />
      </BackIconBox>
      <BackText>{title}</BackText>
    </BackBoxButton>
  );
}
