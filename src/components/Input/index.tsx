import React from 'react';
import {TextInputProps} from 'react-native';
import {LeftIconBox, RightIconBox, InputBox, TextInput} from './styles';

interface Props extends TextInputProps {
  rightIcon?: any;
  leftIcon?: any;
  rightIconMarginLeft?: any;
  rightIconMarginRight?: any;
  leftIconMarginLeft?: any;
  leftIconMarginRight?: any;
  marginTop?: any;
}

export function Input({
  rightIcon,
  leftIcon,
  rightIconMarginLeft,
  rightIconMarginRight,
  leftIconMarginLeft,
  leftIconMarginRight,
  marginTop,
  ...rest
}: Props) {
  return (
    <InputBox marginTop={marginTop}>
      {leftIcon ? (
        <LeftIconBox
          marginLeft={leftIconMarginLeft}
          marginRight={leftIconMarginRight}>
          {leftIcon}
        </LeftIconBox>
      ) : (
        <></>
      )}
      <TextInput {...rest} />
      {rightIcon ? (
        <RightIconBox
          marginLeft={rightIconMarginLeft}
          marginRight={rightIconMarginRight}>
          {rightIcon}
        </RightIconBox>
      ) : (
        <></>
      )}
    </InputBox>
  );
}
