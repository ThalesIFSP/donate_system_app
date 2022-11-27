import {RFValue} from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const TextInput = styled.TextInput`
  width: 78%;
  font-size: ${RFValue(14)}px;
  font-family: Poppins-Regular;
  margin-left: 10px;
`;

export const InputBox = styled.View`
  flex-direction: row;
  margin-top: 10%;
  background-color: rgba(245, 245, 245, 0.5)
`;

export const LeftIconBox = styled.View`
  justify-content: center;
  margin: 0 0 1% 3%;
`;

export const RightIconBox = styled.View`
  justify-content: center;
  margin: 0 0 1% 0%;
`;
