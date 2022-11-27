import {Dimensions} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';
import TextPoppins from '../TextPoppins';

const height = Dimensions.get('window').height;

interface MarginTopProp {
  marginTop?: string;
}

export const BackBoxButton = styled.TouchableOpacity<MarginTopProp>`
  flex-direction: row;
  margin-top: ${({marginTop}) =>
    marginTop ? marginTop : height * 0.08 + 'px'};
  margin-left: 2%;
  margin-bottom: 6%;
`;

export const BackIconBox = styled.View`
  opacity: 0.66;
`;

export const BackText = styled(TextPoppins)`
  font-size: ${RFValue(18)}px;
  text-align: center;
  width: 85%;
  opacity: 0.66;
`;
