import {Dimensions} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';
import TextPoppins from '../../components/TextPoppins';
const {width, height} = Dimensions.get('window');

export const Container = styled.View`
  background-color: #fff;
  flex: 1;
  align-items: center;
`;

export const LogoBox = styled.View`
  margin-top: ${height * 0.2}px;
`;

export const Logo = styled.Image`
  width: ${width}px;
  height: ${height * 0.25}px;
`;

export const WelcomeText = styled(TextPoppins)`
  font-size: ${RFValue(24)}px;
  text-align: center;
  margin: 5% 0 2% 0;
`;

export const DonationPhrase = styled(TextPoppins)`
  font-size: ${RFValue(14)}px;
  text-align: center;
  margin: 15% 5% 0 5%;
`;
