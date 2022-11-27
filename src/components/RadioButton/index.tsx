import React, {useState} from 'react';
import {RFValue} from 'react-native-responsive-fontsize';
import Feather from 'react-native-vector-icons/Feather';
import {
  Container,
  ButtonItem,
  TextItem,
  SelectBox,
  FillSelectBox,
} from './styles';

interface Props {
  data: any;
  userOption: any;
  setUserOption: any;
  boldText?: any;
  icon?: any;
}

export function RadioButton({
  data,
  userOption,
  setUserOption,
  boldText,
  icon,
  ...rest
}: Props) {
  return (
    <Container numberOfItems={data.length}>
      {data.map(item => {
        return (
          <ButtonItem
            key={item.value}
            onPress={() =>
              item.value !== userOption
                ? setUserOption(item.value)
                : setUserOption(null)
            }>
            <SelectBox>
              {userOption === item.value ? (
                <FillSelectBox>
                  <Feather name={'check'} size={RFValue(22)} color={'white'} />
                </FillSelectBox>
              ) : (
                <></>
              )}
            </SelectBox>

            <TextItem weight={boldText ? 'bold' : ''}>
              {icon} {icon ? '  ' : ''}
              {item.title}
            </TextItem>
          </ButtonItem>
        );
      })}
    </Container>
  );
}
