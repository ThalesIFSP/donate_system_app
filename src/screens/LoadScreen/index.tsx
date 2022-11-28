import React, {useEffect} from 'react';

import {Container, DonationPhrase, Logo, LogoBox, WelcomeText} from './styles';
import LogoQuad from '../../../assets/logos/logoQuadrado.png';
import {ActivityIndicator} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {getUser} from '../../routes';
import {initializeAxios} from '../../api/base';

function LoadScreen() {
  const navigation = useNavigation();

  useEffect(() => {
    async function handleNavigate() {
      await initializeAxios();
      const user = await getUser();

      navigation.navigate(user ? 'Main' : 'Login');
    }
    handleNavigate();
  }, []);

  const phrases = [
    'Deve-se doar com a alma livre, simples, apenas por amor, espontaneamente!',
    'A doação transforma o amor abstrato em um ato concreto. Deixe uma marca amorosa na vida de alguém!',
    'A doação sincera jamais empobrece o doador. Doar é receber amor em dobro.',
    'Na vida, o mais importante não é o que você tem, mas sim o que você doa. Compartilhar amor enriquece a alma!',
    'Não importa o valor ou a quantidade que você doa, mas sim a qualidade da sua doação.',
    'Coloque amor em cada um de seus atos e doe o que há de mais belo no mundo.',
    'A doação não é uma obrigação, é o privilégio de praticar um ato de amor.',
    'Doar-se ao próximo é a mais bela forma de se encontrar.',
    'Nada é mais belo do que estender a mão para o próximo e alegrar um coração necessitado.',
    'Somente a solidariedade pode fazer do mundo um lugar melhor para todos!',
  ];

  function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

  return (
    <Container>
      <LogoBox>
        <Logo source={LogoQuad} />
      </LogoBox>
      <WelcomeText>Seja bem-vindo(a)</WelcomeText>
      <ActivityIndicator size={30} color={'#036bb9'} />
      <DonationPhrase>{phrases[getRandomInt(phrases.length)]}</DonationPhrase>
    </Container>
  );
}

export default LoadScreen;
