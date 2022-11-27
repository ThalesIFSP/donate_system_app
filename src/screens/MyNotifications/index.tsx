import React from 'react';

import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Feather from 'react-native-vector-icons/Feather';

import {useNavigation} from '@react-navigation/native';
import {Header} from '../../components/Header';
import {
  Container,
  NotificationBox,
  NotificationDate,
  NotificationIconBox,
  NotificationList,
  NotificationTextBox,
  NotificationTitle,
} from './styles';

function MyNotifications() {
  const navigation = useNavigation();

  const statusIcon = {
    Aberta: <AntDesign name="clockcircleo" size={40} color="black" />,
    Aceita: <AntDesign name="checkcircleo" size={40} color="black" />,
    Finalizada: (
      <MaterialCommunityIcons
        name="map-marker-circle"
        size={40}
        color="black"
      />
    ),
    Cancelada: <Feather name="x-circle" size={40} color="black" />,
  };

  const notifications = [
    {
      status: 'Aberta',
      date: '1/06/2022',
      hour: '15h20',
    },
    {
      status: 'Aceita',
      date: '28/05/2022',
      hour: '15h20',
    },
    {
      status: 'Finalizada',
      date: '25/05/2022',
      hour: '15h05',
    },
    {
      status: 'Cancelada',
      date: '24/05/2022',
      hour: '13h00',
    },
  ];

  function renderItem(item, index) {
    return (
      <NotificationBox key={index}>
        <NotificationIconBox>{statusIcon[item.status]}</NotificationIconBox>
        <NotificationTextBox>
          <NotificationTitle weight="bold">
            Sua{' '}
            {item.status === 'Aberta' || item.status === 'Cancelada'
              ? 'solicitação '
              : 'doação '}
            foi {item.status.toLowerCase()}
          </NotificationTitle>
          <NotificationDate>
            {item.date} às {item.hour}
          </NotificationDate>
        </NotificationTextBox>
      </NotificationBox>
    );
  }

  return (
    <Container>
      <Header title="NOTIFICAÇÕES" onBackPress={() => navigation.goBack()} />
      <NotificationList
        data={notifications}
        renderItem={({item, index}) => renderItem(item, index)}
      />
    </Container>
  );
}

export default MyNotifications;
