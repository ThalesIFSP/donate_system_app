import React, {useEffect, useState} from 'react';
import {
  ConfigTitle,
  Container,
  SuportDetailBox,
  SuportDetailIconBox,
  SuportDetailRow,
  SuportDetailText,
  TextSuport,
  TitleName,
} from './styles';
import {useNavigation} from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {Header} from '../../components/Header';
import {Linking} from 'react-native';
import {getUser} from '../../routes';

function Suport() {
  const [username, setUsername] = useState('');
  const navigation = useNavigation();

  useEffect(() => {
    async function getUsername() {
      const user = await getUser();
      setUsername(user.name);
    }
    getUsername();
  }, []);

  return (
    <Container>
      <Header title="CONTATO" onBackPress={() => navigation.goBack()} />

      <TitleName>{username},</TitleName>
      <TextSuport>
        Deseja incluir uma instituição? Entre em contato com o suporte!
      </TextSuport>
      <TextSuport>Através do email:</TextSuport>
      <SuportDetailBox>
        <SuportDetailRow
          onPress={() =>
            Linking.openURL('mailto:semdesperdiciosemfome@gmail.com')
          }>
          <SuportDetailIconBox>
            <AntDesign name="mail" size={20} color="red" />
          </SuportDetailIconBox>
          <SuportDetailText>semdesperdiciosemfome@gmail.com</SuportDetailText>
        </SuportDetailRow>
      </SuportDetailBox>
    </Container>
  );
}

export default Suport;
