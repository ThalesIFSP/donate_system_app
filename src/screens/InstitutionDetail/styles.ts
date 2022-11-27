import {Dimensions} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';
import TextPoppins from '../../components/TextPoppins';

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

export const Container = styled.ScrollView`
  flex: 1;
  padding: 0 5% 0 5%;
  background-color: white;
`;

export const BackBoxButton = styled.View`
  flex-direction: row;
  margin-top: ${height * 0.08}px;
  margin-left: 2%;
`;

export const BackIconBox = styled.View``;

export const BackText = styled(TextPoppins)`
  font-size: ${RFValue(18)}px;
  margin-left: 3%;
`;

export const ImageBox = styled.Image`
  width: ${width * 0.9}px;
  height: ${height * 0.4}px;
  border-radius: 10px;
  margin-bottom: 5%;
  margin-top: 2%;
`;

export const ContentBox = styled.View`
  margin-left: 5%;
`;

export const TitleLogoBox = styled.View`
  flex-direction: row;
  margin: 4% 0 4% 0;
`;

export const LogoItem = styled.Image`
  width: 30px;
  height: 30px;
  border: 1px solid black;
  border-radius: 15px;
  margin: 0 2% 0 0;
`;

export const NameInstitutionItem = styled(TextPoppins)`
  font-size: ${RFValue(16)}px;
  color: black;
`;

export const InstitutionDescription = styled(TextPoppins)`
  font-size: ${RFValue(15)}px;
  color: '#9D9D9D';
  text-align: justify;
  line-height: ${RFValue(22)}px;
`;

export const AddressTitle = styled(TextPoppins)`
  font-size: ${RFValue(12)}px;
  color: black;
  margin: 5% 0 3% 0;
`;

export const MapsBoxButton = styled.TouchableOpacity`
  flex-direction: row;
`;

export const MapsIconBox = styled.View`
  margin-right: 2%;
`;

export const AddressText = styled(TextPoppins)`
  font-size: ${RFValue(13)}px;
  color: #4161d3;
  text-decoration: underline;
`;
