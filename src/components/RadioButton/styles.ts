import {Dimensions} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';
import TextPoppins from '../TextPoppins';

const height = Dimensions.get('window').height;

interface ContainerProps {
  numberOfItems: number;
}

export const Container = styled.ScrollView<ContainerProps>`
  height: ${({numberOfItems}) =>
    numberOfItems > 3 ? height * 0.15 + 'px' : 'auto'};
`;

export const ButtonItem = styled.Pressable`
  flex-direction: row;
`;

export const TextItem = styled(TextPoppins)`
  justify-content: center;
  margin-top: 3%;
`;

export const SelectBox = styled.View`
  border: 1px solid gray;
  width: 25px;
  height: 25px;
  border-radius: 5px;
  margin: 2% 5% 2% 1%;
`;

export const FillSelectBox = styled.View`
  background-color: #3b4256;
  flex: 1;
`;
