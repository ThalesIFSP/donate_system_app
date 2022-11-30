import React, {useEffect, useState} from 'react';
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
import {getUser, logout} from '../../routes';

function Profile() {
  const [isModerator, setIsModerator] = useState(false);
  const [username, setUsername] = useState('');
  const navigation = useNavigation();

  useEffect(() => {
    async function getUserInfo() {
      const user = await getUser();
      setUsername(user.name);
      setIsModerator(user.moderatorId);
    }
    getUserInfo();
  }, []);

  function renderConfigItem(item, index) {
    return (
      item.title && (
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
      )
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
      title: isModerator ? 'Solicitações Pendentes' : false,
      onPress: () => navigation.navigate('ModeratorSolicitation'),
    },
    {
      title: isModerator ? 'Solicitações Abertas' : false,
      onPress: () => navigation.navigate('ModeratorDone'),
    },
    {
      title: 'Contato',
      onPress: () => {
        navigation.navigate('Suport');
      },
    },
    {
      title: 'Sair',
      onPress: async () => {
        await logout();
        navigation.navigate('Load');
      },
    },
  ];

  return (
    <Container>
      <TitleName>{username}</TitleName>
      <ConfigList
        data={configOptions}
        renderItem={({item, index}) => renderConfigItem(item, index)}
      />
    </Container>
  );
}

export default Profile;
