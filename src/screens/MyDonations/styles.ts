import {Dimensions} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';
import TextPoppins from '../../components/TextPoppins';

const {width, height} = Dimensions.get('window');

interface StatusColorProps {
  color: string;
}

export const Container = styled.View`
  flex: 1;
  padding: 0% 5% 10% 5%;
  background-color: white;
`;

export const DonationList = styled.FlatList``;

export const DonationBox = styled.TouchableOpacity`
  padding-top: 3%;
  padding-bottom: 3%;
  flex-direction: row;
  border-bottom-width: 1px;
  border-bottom-color: rgba(0, 0, 0, 0.3);
`;

export const DonationIconBox = styled.View`
  justify-content: center;
`;

export const DonationTextBox = styled.View`
  margin-left: 5%;
`;

export const DonationTitle = styled(TextPoppins)`
  font-size: ${RFValue(14)}px;
`;

export const DonationStatus = styled(TextPoppins)<StatusColorProps>`
  font-size: ${RFValue(14)}px;
  color: ${({color}) => color};
`;

export const ModalContainer = styled.View`
  flex: 1;
  padding: 0% 5% 10% 5%;
`;

export const PickupLabel = styled(TextPoppins)`
  font-size: ${RFValue(16)}px;
  margin-right: 2%;
`;

export const PickupText = styled(TextPoppins)`
  font-size: ${RFValue(16)}px;
`;

export const PickupModalBox = styled.View`
  flex-direction: row;
  width: 80%;
`;

export const CharityLabel = styled(TextPoppins)`
  font-size: ${RFValue(16)}px;
  margin-right: 2%;
`;

export const CharityText = styled(TextPoppins)`
  font-size: ${RFValue(16)}px;
`;

export const CharityModalBox = styled.View`
  flex-direction: row;
  width: 80%;
`;

export const StatusLabel = styled(TextPoppins)`
  font-size: ${RFValue(16)}px;
  margin-right: 2%;
`;

export const StatusText = styled(TextPoppins)<StatusColorProps>`
  font-size: ${RFValue(16)}px;
  color: ${({color}) => color};
`;

export const StatusModalBox = styled.View`
  flex-direction: row;
`;

export const AnonymousLabel = styled(TextPoppins)`
  font-size: ${RFValue(16)}px;
  margin-right: 2%;
`;

export const AnonymousText = styled(TextPoppins)`
  font-size: ${RFValue(16)}px;
`;

export const AnonymousModalBox = styled.View`
  flex-direction: row;
`;

//RenderPageItem

export const PageModal = styled.View`
  width: ${width * 0.84}px;
  margin: ${width * 0.02}px;
`;

export const ImageItemModal = styled.Image`
  width: ${width * 0.84}px;
  height: ${height * 0.3}px;
`;

export const DescriptionItemModal = styled(TextPoppins)`
  background-color: rgba(0, 0, 0, 0.1);
  padding: 5%;
  text-align: justify;
  border-radius: 5px;
`;

export const SubtitleModal = styled(TextPoppins)`
  font-size: ${RFValue(20)}px;
  margin: 2%;
`;

export const ValidityTextModal = styled(TextPoppins)`
  font-size: ${RFValue(18)}px;
  margin: 2%;
`;

export const AddressTextModal = styled(TextPoppins)`
  font-size: ${RFValue(15)}px;
  margin: 2%;
`;

export const CancelButton = styled.TouchableOpacity`
  background-color: transparent;
  padding-top: 2%;
  padding-bottom: 2%;
  padding-left: 8%;
  padding-right: 8%;
  border: 1px solid red;
  align-items: center;
`;

export const CancelText = styled(TextPoppins)`
  color: red;
  font-size: ${RFValue(18)}px;
`;
