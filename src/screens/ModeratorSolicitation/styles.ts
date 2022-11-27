import {Dimensions} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';
import TextPoppins from '../../components/TextPoppins';

const {width, height} = Dimensions.get('window');

export const Container = styled.View`
  flex: 1;
  padding: 0% 5% 10% 5%;
  background-color: white;
`;

export const DonationList = styled.FlatList``;

export const DonationButton = styled.TouchableOpacity`
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

export const DonationStatus = styled(TextPoppins)`
  font-size: ${RFValue(14)}px;
  color: rgba(0, 0, 0, 0.5);
`;

export const ContainerModal = styled.View`
  padding: 1%;
`;

export const TitleContainer = styled.View`
  flex-direction: row;
`;

export const NameModal = styled(TextPoppins)`
  font-size: ${RFValue(24)}px;
  margin: 3%;
`;

export const IconButton = styled.TouchableOpacity`
  position: absolute;
  right: 5%;
  top: 20%;
`;

export const PageModal = styled.View`
  width: ${width * 0.84}px;
  margin: ${width * 0.02}px;
`;

export const ImageItemModal = styled.Image`
  width: ${width * 0.84}px;
  height: ${height * 0.3};
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

export const BoxButton = styled.View`
  flex-direction: row;
  justify-content: space-around;
  margin-top: 10%;
`;

export const AcceptButtonModal = styled.TouchableOpacity`
  background-color: #4161d3;
  padding-top: 2%;
  padding-bottom: 2%;
  padding-left: 8%;
  padding-right: 8%;
`;
export const AcceptTextButtonModal = styled(TextPoppins)`
  color: white;
  font-size: ${RFValue(18)}px;
`;

export const RefuseButtonModal = styled.TouchableOpacity`
  background-color: transparent;
  padding-top: 2%;
  padding-bottom: 2%;
  padding-left: 8%;
  padding-right: 8%;
  border: 1px solid red;
`;
export const RefuseTextButtonModal = styled(TextPoppins)`
  color: red;
  font-size: ${RFValue(18)}px;
`;
