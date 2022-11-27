import {RFValue} from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';
import TextPoppins from '../../components/TextPoppins';

export const Container = styled.View`
  flex: 1;
  padding: 15% 5% 10% 5%;
  background-color: white;
`;

export const TitleName = styled(TextPoppins)`
  font-size: ${RFValue(24)}px;
  margin-bottom: 5%;
`;

export const ConfigList = styled.FlatList``;

export const ConfigBox = styled.TouchableHighlight`
  flex-direction: row;
  width: 100%;
  border-bottom-width: 1px;
  border-bottom-color: #e7ecf3;
  padding: 4% 0 4% 0;
`;

export const ConfigTitle = styled(TextPoppins)`
  font-size: ${RFValue(18)}px;
  width: 90%;
`;

export const ConfigIconBox = styled.View`
  margin-top: 0.5%;
`;
