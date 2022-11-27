import {RFValue} from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';
import TextPoppins from '../../components/TextPoppins';

export const Container = styled.View`
  flex: 1;
  padding: 0% 5% 10% 5%;
  background-color: white;
`;

export const NotificationList = styled.FlatList``;

export const NotificationBox = styled.View`
  padding-top: 3%;
  padding-bottom: 7%;
  flex-direction: row;
  border-bottom-width: 1px;
  border-bottom-color: rgba(0, 0, 0, 0.3);
`;

export const NotificationIconBox = styled.View`
  justify-content: center;
`;

export const NotificationTextBox = styled.View`
  margin-left: 5%;
`;

export const NotificationTitle = styled(TextPoppins)`
  font-size: ${RFValue(14)}px;
`;

export const NotificationDate = styled(TextPoppins)`
  font-size: ${RFValue(14)}px;
  color: #666666;
`;
