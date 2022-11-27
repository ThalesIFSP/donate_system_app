import React from 'react';
import {TextInputProps} from 'react-native';

import {InputBox, TextInput} from './styles';

interface Props extends TextInputProps {}

export function TextArea({...rest}: Props) {
  return (
    <InputBox>
      <TextInput
        {...rest}
        placeholder={'Descreva um pouco o item'}
        multiline={true}
        numberOfLines={5}
      />
    </InputBox>
  );
}
