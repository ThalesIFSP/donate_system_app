import {RFValue} from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';
import TextPoppins from '../../components/TextPoppins';

export const Container = styled.View`
  flex: 1;
  padding-left: 5%;
  background-color: white;
`;

export const TitleName = styled(TextPoppins)`
  font-size: ${RFValue(20)}px;
  margin-bottom: 5%;
`;

export const TextSuport = styled(TextPoppins)`
  font-size: ${RFValue(16)}px;
  margin-bottom: 5%;
`;

export const SuportDetailBox = styled.View``;
export const SuportDetailRow = styled.TouchableOpacity`
  flex-direction: row;
`;
export const SuportDetailIconBox = styled.View`
  justify-content: center;
  margin-right: 3%;
`;
export const SuportDetailText = styled(TextPoppins)`
  text-decoration: underline blue;
  color: blue;
`;
