import {RFValue} from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const TextInput = styled.TextInput`
  font-size: ${RFValue(14)}px;
  font-family: Poppins-Regular;
  margin-left: 10px;
`;

export const InputBox = styled.View`
  margin-top: 1%;
  background-color: #f8fafc;
  border-radius: 4px;
`;
