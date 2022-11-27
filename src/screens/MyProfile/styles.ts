import {RFValue} from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';
import TextPoppins from '../../components/TextPoppins';

export const Container = styled.View`
  flex: 1;
  padding: 0% 5% 5% 5%;
  background-color: white;
`;

export const Form = styled.View`
  flex: 1;
`;

export const Subtitle = styled(TextPoppins)`
  font-size: ${RFValue(18)}px;
  margin-bottom: 2%;
  margin-top: 2%;
`;

export const RowBox = styled.View`
  width: 100%;
  flex-direction: row;
`;

export const RowDivide1 = styled.View`
  width: 70%;
`;

export const RowDivide2 = styled.View`
  width: 25%;
  margin-left: 5%;
  margin-top: 4.5%;
`;

export const EditButton = styled.TouchableOpacity`
  border-radius: 5px;
  background-color: #036bb9;
  padding: 5px 0 5px 0;
  margin-top: 10%;
  margin-bottom: 10%;
`;

export const EditButtonText = styled.Text`
  color: white;
  font-size: ${RFValue(25)}px;
  font-family: Poppins-Regular;
  text-align: center;
`;
