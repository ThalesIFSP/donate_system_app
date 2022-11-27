import React, {ReactNode} from 'react';
import {TextProps} from 'react-native';
import {Text} from './styles';

interface Props extends TextProps {
  weight?: string;
}

export default function TextPoppins({weight, ...rest}: Props) {
  return <Text weight={weight} {...rest}></Text>;
}
