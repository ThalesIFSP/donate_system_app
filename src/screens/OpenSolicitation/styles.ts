import {Dimensions} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';
import TextPoppins from '../../components/TextPoppins';

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

interface SelectButtonOtherProps {
  disabledStyles?: any;
}

interface SelectInstitutionProps {
  selected: boolean;
}

interface AddImageProps {
  backgroundImage: any;
}

export const Container = styled.ScrollView`
  flex: 1;
  padding: 0 5% 0 5%;
  background-color: white;
`;

export const TitleText = styled(TextPoppins)`
  font-size: ${RFValue(22)}px;
`;

export const SubtitleText = styled(TextPoppins)`
  font-size: ${RFValue(13)}px;
  opacity: 0.66;
  margin: 2% 0 2% 0;
`;

export const ItemBox = styled.View`
  margin-top: 3%;
  border-bottom-width: 1px;
  border-bottom-color: rgba(0, 0, 0, 0.3);
`;

export const ItemTitle = styled(TextPoppins)`
  font-size: ${RFValue(14)}px;
`;

export const ItemValidity = styled(TextPoppins)`
  font-size: ${RFValue(14)}px;
  color: #666666;
  margin-bottom: 3%;
`;

export const AddItemModal = styled.Modal``;

export const ContainerModal = styled.View`
  flex: 1;
  padding: 0 10% 0 5%;
  background-color: white;
`;

export const AddItemButton = styled.TouchableOpacity`
  flex-direction: row;
  margin-top: 3%;
`;

export const AddItemText = styled(TextPoppins)`
  color: #036bb9;
  font-size: ${RFValue(14)}px;
`;

export const AddImageButton = styled.TouchableOpacity<AddImageProps>`
  flex-direction: column;
  align-items: center;
  background-image: ${({backgroundImage}) =>
    backgroundImage ? backgroundImage : ''};
`;

export const AddImageText = styled(TextPoppins)`
  font-size: ${RFValue(18)}px;
  margin-top: 5%;
  margin-bottom: 3%;
`;

export const Form = styled.View``;

export const InputBox = styled.View`
  margin-top: 8%;
`;

export const InputLabel = styled(TextPoppins)`
  color: #666666;
  font-size: ${RFValue(15)}px;
`;

export const CalendarContainer = styled.View`
  padding: 10% 5% 5% 5%;
`;

export const CalendarBoxButton = styled.TouchableOpacity``;

export const SelectDateButton = styled.TouchableOpacity<SelectButtonOtherProps>`
  align-self: center;
  justify-content: center;
  background-color: ${({disabledStyles}) =>
    disabledStyles ? '#666666' : '#036bb9'};
  padding: 2% 5% 2% 5%;
  border-radius: 15px;
  margin-top: 5%;
`;
export const SelectDateText = styled(TextPoppins)`
  text-align: center;
  color: #fff;
  font-size: ${RFValue(24)}px;
`;

export const BackModalButton = styled.TouchableOpacity`
  align-self: center;
  justify-content: center;
`;

export const BackModalText = styled(TextPoppins)`
  text-align: center;
  color: black;
  font-size: ${RFValue(20)}px;
  opacity: 0.66;
  margin-top: 2%;
`;

export const AddButtonModal = styled.TouchableOpacity`
  background-color: #036bb9;
  justify-content: center;
  align-self: center;
  border-radius: 10px;
  padding: 2%;
  margin-top: 5%;
  width: ${width * 0.6}px;
`;

export const AddTextModal = styled(TextPoppins)`
  color: white;
  font-size: ${RFValue(20)}px;
  text-align: center;
`;

export const SelectInstitutionText = styled(TextPoppins)`
  margin-top: 5%;
  font-size: ${RFValue(12)}px;
`;

export const InstitutionListBox = styled.ScrollView`
  height: ${height * 0.35}px;
`;

export const InstitutionBox = styled.TouchableOpacity<SelectInstitutionProps>`
  flex-direction: row;
  background-color: ${({selected}) => (selected ? '#0386D00F' : 'white')};
  border-bottom-width: 0.7px;
  border-bottom-color: rgba(0, 0, 0, 0.3);
  padding: 5%;
`;

export const InstitutionLogo = styled.Image`
  width: 64px;
  height: 64px;
  border-radius: 32px;
`;

export const InstitutionTextBox = styled.View`
  flex-direction: column;
  margin-left: 3%;
`;

export const InstitutionText = styled(TextPoppins)`
  font-size: ${RFValue(15)}px;
`;

export const InstitutionAddress = styled(TextPoppins)`
  color: #666666;
  font-size: ${RFValue(13)}px;
`;

export const SolicitationButton = styled.TouchableOpacity`
  background-color: #036bb9;
  justify-content: center;
  align-self: center;
  border-radius: 10px;
  padding: 2%;
  margin-top: 5%;
  width: ${width * 0.9}px;
`;

export const SolicitationText = styled(TextPoppins)`
  color: white;
  font-size: ${RFValue(22)}px;
  text-align: center;
`;
