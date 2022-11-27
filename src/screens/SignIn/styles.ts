import styled from 'styled-components/native';
import {RFValue} from 'react-native-responsive-fontsize';

interface TextProps {
  active: boolean;
}

export const Container = styled.View`
  flex: 1;
  background-color: white;
`;

export const HeaderBox = styled.View``;

export const TitleText = styled.Text`
  font-size: ${RFValue(40)}px;
  text-align: center;
  font-family: Poppins-Regular;
  color: black;
  margin-top: 20%;
`;

export const Subtitle = styled.Text<TextProps>`
  color: ${({active}) => (active ? '#036BB9' : '#A6A6A6')};
  font-size: ${RFValue(25)}px;
  font-family: Poppins-Regular;
`;

export const SubtitleButton = styled.TouchableOpacity`
  align-items: center;
  justify-content: space-evenly;
`;

export const SubtitleBox = styled.View`
  flex-direction: row;
  justify-content: space-evenly;
`;

export const SelectIndicator = styled.View`
  width: 43px;
  border: 0.7px solid #036bb9;
`;

export const SelectBox = styled.View`
  flex-direction: column;
  align-items: center;
`;

export const Form = styled.View`
  flex: 1;
  padding: 1% 8% 0px 8%;
`;

export const IconButton = styled.Pressable``;

export const ForgotPassButton = styled.TouchableWithoutFeedback`
  flex: 1;
`;

export const ForgotPassText = styled.Text`
  color: #036bb9;
  font-size: ${RFValue(14)}px;
  font-family: Poppins-Regular;
  align-self: flex-end;
  margin-top: 5%;
`;

export const LoginButton = styled.TouchableOpacity`
  border-radius: 5px;
  background-color: #036bb9;
  padding: 5px 0 5px 0;
  margin-top: 10%;
`;

export const LoginButtonText = styled.Text`
  color: white;
  font-size: ${RFValue(25)}px;
  font-family: Poppins-Regular;
  text-align: center;
`;

export const OtherLoginBox = styled.View`
  flex-direction: row;
  width: 100%;
  margin: 4% 0 4% 0;
`;
export const OtherLoginLine = styled.View`
  border-bottom-width: 1px;
  border-bottom-color: #a6a6a6;
  width: 23.5%;
  margin-bottom: 3.5%;
`;
export const OtherLoginText = styled.Text`
  color: #a6a6a6;
  font-size: ${RFValue(15)}px;
  font-family: Poppins-Regular;
  margin-left: 2%;
  margin-right: 2%;
`;
