import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Feather from 'react-native-vector-icons/Feather';

import {
  AcceptButtonModal,
  AcceptTextButtonModal,
  AddressTextModal,
  BoxButton,
  Container,
  ContainerModal,
  DescriptionItemModal,
  DonationButton,
  DonationIconBox,
  DonationList,
  DonationStatus,
  DonationTextBox,
  DonationTitle,
  IconButton,
  ImageItemModal,
  NameModal,
  PageModal,
  RefuseButtonModal,
  RefuseTextButtonModal,
  SubtitleModal,
  TitleContainer,
  ValidityTextModal,
} from './styles';
import {Header} from '../../components/Header';
import {Dimensions, FlatList, Modal, Text} from 'react-native';

function ModeratorSolicitation() {
  const [selectedSolicitation, setSelectedSolicitation] = useState();
  const [visible, setVisible] = useState(false);

  const navigation = useNavigation();
  const donationsList = [
    {
      title: '5 Molhos de tomate',
      name: 'Luis Otávio',
      dateCreate: '19/12/2022',
      items: [
        {
          title: '5 Molhos de tomate',
          img: 'https://www.efacil.com.br/wcsstore/ExtendedSitesCatalogAssetStore/Imagens/1000/4900659_01.jpg',
          validity: '12/12/2022',
        },
      ],
      anonymous: false,
      address: 'Irá entregar na instituição.',
    },
    {
      title: 'Cesta de peras',
      name: 'Pedro Henrique',
      dateCreate: '19/12/2022',
      items: [
        {
          title: 'Cesta de peras',
          img: 'https://thumbs.dreamstime.com/b/cesta-com-peras-9430042.jpg',
          validity: '12/12/2022',
        },
      ],
      anonymous: true,
      address: 'Irá entregar na instituição.',
    },
    {
      title: '5 litros de oleo',
      name: 'Gustavo Oliveira',
      dateCreate: '19/12/2022',
      items: [
        {
          title: '5 Molhos de tomate',
          img: 'https://a-static.mlcdn.com.br/1500x1500/kit-3-unidades-oleo-de-soja-liza-900ml-lisa/sobrinhosmodafeminina/1569p/e2d5a83d63fb3951931d908f885a5173.jpeg',
          validity: '12/12/2022',
        },
      ],
      anonymous: false,
      address: 'Rua Javari, 3046 - Cidade Nova, Votuporanga - SP',
    },
    {
      title: '3 litros de leite + 2 itens',
      name: 'Rafael Andrade',
      dateCreate: '19/12/2022',
      items: [
        {
          title: '3 litros de leite',
          img: 'https://m.media-amazon.com/images/I/51wNnRI8zTL._AC_SX522_.jpg',
          validity: '12/12/2022',
        },
        {
          title: '1 caixa de uva',
          img: 'https://tudosobrealimentosebebidas.com.br/img/uva-vitoria-cumbuca-500g.jpg',
          validity: '19/11/2022',
        },
        {
          title: '2kg de farinha de trigo',
          img: 'https://d3gdr9n5lqb5z7.cloudfront.net/fotos/954064.jpg',
          validity: '30/11/2022',
        },
      ],
      anonymous: false,
      address: 'Rua Javari, 3046 - Cidade Nova, Votuporanga - SP',
    },
  ];
  const width = Dimensions.get('window').width;

  function openSolicitationModal(item) {
    setSelectedSolicitation(item);
    setVisible(true);
  }

  function renderItem(item, index) {
    return (
      <DonationButton key={index} onPress={() => openSolicitationModal(item)}>
        <DonationIconBox>
          <AntDesign name="clockcircleo" size={40} color="black" />
        </DonationIconBox>
        <DonationTextBox>
          <DonationTitle weight="bold">
            {item.anonymous ? 'Doador anônimo' : item.name}: {item.title}
          </DonationTitle>
          <DonationStatus>{item.dateCreate}</DonationStatus>
        </DonationTextBox>
      </DonationButton>
    );
  }

  function renderPageItem(item, index) {
    return (
      <PageModal>
        <ImageItemModal source={{uri: item.img}} resizeMode={'contain'} />
        <SubtitleModal>Descrição</SubtitleModal>
        <DescriptionItemModal>{item.title}</DescriptionItemModal>
        <ValidityTextModal>Validade: {item.validity}</ValidityTextModal>
        <SubtitleModal>Endereço:</SubtitleModal>
        <AddressTextModal>{selectedSolicitation?.address}</AddressTextModal>
      </PageModal>
    );
  }

  async function acceptSolicitation() {
    setVisible(false);
  }
  async function refuseSolicitation() {
    setVisible(false);
  }

  return (
    <Container>
      <Modal visible={visible}>
        <ContainerModal>
          <TitleContainer>
            <NameModal>
              {selectedSolicitation?.anonymous
                ? 'Doador anônimo'
                : selectedSolicitation?.name}
            </NameModal>
            <IconButton onPress={() => setVisible(false)}>
              <AntDesign name="close" size={30} />
            </IconButton>
          </TitleContainer>
          <FlatList
            data={selectedSolicitation?.items}
            renderItem={({item, index}) => renderPageItem(item, index)}
            horizontal={true}
            decelerationRate={0}
            snapToInterval={width * 0.88}
            snapToAlignment={'center'}
            contentInset={{
              top: 0,
              left: 30,
              bottom: 0,
              right: 30,
            }}
          />
          <BoxButton>
            <RefuseButtonModal onPress={() => refuseSolicitation()}>
              <RefuseTextButtonModal>Rejeitar</RefuseTextButtonModal>
            </RefuseButtonModal>
            <AcceptButtonModal onPress={() => acceptSolicitation()}>
              <AcceptTextButtonModal weight="bold">
                Aceitar
              </AcceptTextButtonModal>
            </AcceptButtonModal>
          </BoxButton>
        </ContainerModal>
      </Modal>
      <Header
        title="SOLICITAÇÕES PENDENTES"
        onBackPress={() => navigation.goBack()}
      />
      <DonationList
        data={donationsList}
        renderItem={({item, index}) => renderItem(item, index)}
      />
    </Container>
  );
}

export default ModeratorSolicitation;
