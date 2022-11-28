import styled from 'styled-components/native';
import TextPoppins from '../../components/TextPoppins';
import {RFValue} from 'react-native-responsive-fontsize';
import {Dimensions} from 'react-native';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

interface ItemBoxProps {
  last?: boolean;
}

export const Container = styled.View`
  flex: 1;
  padding: 15% 8% 0 8%;
  background-color: white;
`;

export const HeaderBox = styled.View`
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
`;

export const HeaderTextBox = styled.View`
  flex-direction: column;
`;

export const HiText = styled(TextPoppins)`
  font-size: ${RFValue(18)}px;
`;

export const NameText = styled(TextPoppins)`
  font-size: ${RFValue(14)}px;
`;

export const BellIconBox = styled.View`
 
  flex-direction: row-reverse;
  align-items: center;
`;

export const CountBox = styled.View`
  flex-direction: row;
  justify-content: space-around;
  margin-top: 10%;
`;

export const ItemCountBox = styled.View`
  flex-direction: column;
  align-items: center;
`;

export const ItemCountText = styled(TextPoppins)`
  font-size: ${RFValue(14)}px;
`;

export const CountText = styled(TextPoppins)`
  font-size: ${RFValue(14)}px;
`;

export const ItemBoxButton = styled.TouchableOpacity<ItemBoxProps>`
  background-color: white;
  border-radius: 20px;
  elevation: 4;
  margin-top: 5%;
  margin-bottom: ${({last}) => (last ? '4%' : 0)};
`;

export const ImageItem = styled.Image`
  width: ${width * 0.84}px;
  height: ${height * 0.2}px;
  border-radius: 20px;
`;

export const TitleItemBox = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const LogoItem = styled.Image`
  width: 30px;
  height: 30px;
  border: 1px solid black;
  border-radius: 15px;
  margin: 0 2% 2% 5%;
`;

export const AddressItem = styled(TextPoppins)`
  font-size: ${RFValue(13)}px;
  color: black;
  opacity: 0.4;
  margin-left: 5%;
`;

export const NameInstitutionItem = styled(TextPoppins)`
  font-size: ${RFValue(16)}px;
  color: black;
`;
