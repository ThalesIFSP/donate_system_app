import React from 'react';
import {TextInputProps} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import {LeftIconBox, RightIconBox, InputBox, TextInput} from './styles';

interface Props extends TextInputProps {}

export function SearchInput({...rest}: Props) {
  return (
    <InputBox>
      <LeftIconBox>
        <Entypo
          name="magnifying-glass"
          size={25}
          color={'rgba(60, 60, 67, 0.6)'}
        />
      </LeftIconBox>

      <TextInput {...rest} placeholder={'Pesquisar'} />

      <RightIconBox>
        <FontAwesome name="microphone" size={25} color={'black'} />
      </RightIconBox>
    </InputBox>
  );
}
