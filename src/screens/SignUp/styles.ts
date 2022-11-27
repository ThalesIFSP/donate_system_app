import styled from 'styled-components/native';
import {RFValue} from 'react-native-responsive-fontsize';

export const Container = styled.View`
  flex: 1;
  background-color: white;
`;

export const Form = styled.View`
  flex: 1;
  padding: 1% 8% 0px 8%;
`;

export const RowBox = styled.View`
  width: 100%;
  flex-direction: row;
`;

export const RowDivide1 = styled.View`
  width: 60%;
`;

export const RowDivide2 = styled.View`
  width: 35%;
  margin-left: 5%;
  margin-top: 2.5%;
`;

export const RegisterButton = styled.TouchableOpacity`
  border-radius: 5px;
  background-color: #036bb9;
  padding: 5px 0 5px 0;
  margin-top: 10%;
  margin-bottom: 10%;
`;

export const RegisterButtonText = styled.Text`
  color: white;
  font-size: ${RFValue(25)}px;
  font-family: Poppins-Regular;
  text-align: center;
`;

export const IconButton = styled.Pressable``;
