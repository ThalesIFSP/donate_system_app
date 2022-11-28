import {RFValue} from 'react-native-responsive-fontsize';
import {Dimensions} from 'react-native';
import styled from 'styled-components/native';
import TextPoppins from '../../components/TextPoppins';

const {width, height} = Dimensions.get('window');

export const Container = styled.View`
  flex: 1;
  padding: 0% 5% 10% 5%;
  background-color: white;
`;

export const NotificationList = styled.FlatList``;

export const NotificationButton = styled.TouchableOpacity`
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

export const CharityBox = styled.View`
  flex-direction: row;
`;
export const CharityLabel = styled(TextPoppins)`
  font-size: ${RFValue(16)}px;
  margin-right: 2%;
`;
export const CharityText = styled(TextPoppins)`
  font-size: ${RFValue(16)}px;
  margin-right: 2%;
  width: ${width * 0.65}px;
`;
