import {RFValue} from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

interface CustomizeBoxProps {
  marginLeft?: any;
  marginRight?: any;
}

interface CustomizeInputBoxProps {
  marginTop?: any;
}

export const TextInput = styled.TextInput`
  width: 78%;
  font-size: ${RFValue(14)}px;
  font-family: Poppins-Regular;
  margin-left: 10px;
  color: black;
`;

export const InputBox = styled.View<CustomizeInputBoxProps>`
  flex-direction: row;
  border-bottom-width: 1px;
  border-bottom-color: #a6a6a6;
  margin-top: ${({marginTop}) => (marginTop ? marginTop : '10%')};
`;

export const LeftIconBox = styled.View<CustomizeBoxProps>`
  justify-content: center;
  margin: 0 0 1% 1%;
  margin-left: ${({marginLeft}) => (marginLeft ? marginLeft : 0)};
  margin-right: ${({marginRight}) => (marginRight ? marginRight : 0)};
`;

export const RightIconBox = styled.View<CustomizeBoxProps>`
  justify-content: center;
  margin: 0 0 1% 1%;
  margin-left: ${({marginLeft}) => (marginLeft ? marginLeft : 0)};
  margin-right: ${({marginRight}) => (marginRight ? marginRight : 0)};
`;
