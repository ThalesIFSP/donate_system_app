import React from 'react';
import {
  ConfigBox,
  ConfigIconBox,
  ConfigList,
  ConfigTitle,
  Container,
  TitleName,
} from './styles';
import {useNavigation} from '@react-navigation/native';
import Feather from 'react-native-vector-icons/Feather';

function Profile() {
  const navigation = useNavigation();

  function renderConfigItem(item, index) {
    return (
      <ConfigBox
        key={index}
        activeOpacity={0.32}
        underlayColor="#D9D9D952"
        onPress={item.onPress}>
        <>
          <ConfigTitle>{item.title}</ConfigTitle>
          <ConfigIconBox>
            <Feather name="chevron-right" size={25} />
          </ConfigIconBox>
        </>
      </ConfigBox>
    );
  }

  const configOptions = [
    {
      title: 'Meus dados',
      onPress: () => navigation.navigate('MyProfile'),
    },
    {
      title: 'Doações',
      onPress: () => navigation.navigate('MyDonations'),
    },
    {
      title: 'Notificações',
      onPress: () => navigation.navigate('MyNotifications'),
    },

    {
      title: 'Contato',
      onPress: () => {
        navigation.navigate('Suport');
      },
    },
    {
      title: 'Sair',
      onPress: () => navigation.navigate('Login'),
    },
  ];

  return (
    <Container>
      <TitleName>Petrucio da Silva</TitleName>
      <ConfigList
        data={configOptions}
        renderItem={({item, index}) => renderConfigItem(item, index)}
      />
    </Container>
  );
}

export default Profile;
