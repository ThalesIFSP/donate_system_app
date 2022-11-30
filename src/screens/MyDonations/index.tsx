import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Feather from 'react-native-vector-icons/Feather';

import {
  AnonymousLabel,
  AnonymousModalBox,
  AnonymousText,
  CancelButton,
  CancelText,
  CharityLabel,
  CharityModalBox,
  CharityText,
  Container,
  DescriptionItemModal,
  DonationBox,
  DonationIconBox,
  DonationList,
  DonationStatus,
  DonationTextBox,
  DonationTitle,
  ImageItemModal,
  ModalContainer,
  PageModal,
  PickupLabel,
  PickupModalBox,
  PickupText,
  StatusLabel,
  StatusModalBox,
  StatusText,
  SubtitleModal,
  ValidityTextModal,
} from './styles';
import {Header} from '../../components/Header';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {
  cancelSolicitation,
  getSolicitationDetail,
  getSolicitationsByUser,
} from '../../actions/Solicitation';
import {Dimensions, FlatList, Modal, Alert} from 'react-native';
import {getUser} from '../../routes';

const {width, height} = Dimensions.get('window');

function MyDonations(props) {
  const [solicitationList, setSolicitationList] = useState([]);
  const [getFlag, setGetFlag] = useState(false);
  const [visibleDetail, setVisibleDetail] = useState(false);
  const [detailData, setDetailData] = useState();
  const [detailFlag, setDetailFlag] = useState(false);
  const [cancelFlag, setCancelFlag] = useState(false);
  const [refresh, setRefresh] = useState(false);

  const navigation = useNavigation();

  const statusColor = {
    OPENED: '#FF8652',
    ACCEPTED: '#2390F4',
    REFUSED: '#ccaccc',
    CANCELED: '#FF0000',
    WAITING_DELIVERY: '#5A959A',
    DONE: '#589235',
  };

  const statusHuman = {
    OPENED: 'Aberta',
    ACCEPTED: 'Aceita',
    REFUSED: 'Negada',
    CANCELED: 'Cancelada',
    WAITING_DELIVERY: 'Aguardando entrega',
    DONE: 'Finalizada',
  };

  const statusIcon = {
    OPENED: <AntDesign name="clockcircleo" size={40} color="black" />,
    ACCEPTED: <AntDesign name="checkcircleo" size={40} color="black" />,
    REFUSED: <Feather name="x-circle" size={40} color="black" />,
    CANCELED: <Feather name="x-circle" size={40} color="black" />,
    WAITING_DELIVERY: (
      <MaterialCommunityIcons name="truck" size={40} color="black" />
    ),
    DONE: (
      <MaterialCommunityIcons
        name="map-marker-circle"
        size={40}
        color="black"
      />
    ),
  };

  async function getSolicitations() {
    const {getSolicitationsByUser} = props;
    const user = await getUser();
    await getSolicitationsByUser(user.idt); //passar userId do getUser
    setGetFlag(true);
  }

  useEffect(() => {
    getSolicitations();
  }, [refresh]);

  useEffect(() => {
    async function getSolicitations() {
      if (getFlag) {
        const {getSolicitationUserSucess, solicitationData} =
          props.solicitation;

        if (getSolicitationUserSucess) {
          setSolicitationList(solicitationData);
        }
      }
      setGetFlag(false);
    }
    getSolicitations();
  }, [getFlag]);

  useEffect(() => {
    if (cancelFlag) {
      const {cancelSolicitationSuccess} = props.solicitation;
      if (cancelSolicitationSuccess) {
        setRefresh(!refresh);
        setVisibleDetail(false);
      }
    }
    setCancelFlag(false);
  }, [cancelFlag]);

  useEffect(() => {
    if (detailFlag) {
      const {getSolicitationDetailSuccess, solicitationDetail} =
        props.solicitation;
      if (getSolicitationDetailSuccess) {
        setDetailData(solicitationDetail);
        setVisibleDetail(true);
      }
    }
    setDetailFlag(false);
  }, [detailFlag]);

  function capitalizeFirstLetter(string: string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  async function openDetail(solicitationId: number) {
    const {getSolicitationDetail} = props;
    await getSolicitationDetail(solicitationId);
    setDetailFlag(true);
  }

  async function handleCancel(idSolicitation) {
    Alert.alert(
      'Cancelar',
      'Tem certeza que deseja cancelar sua solicitação?',
      [
        {
          text: 'Sim',
          onPress: async () => {
            const {cancelSolicitation} = props;
            const user = await getUser();
            await cancelSolicitation(idSolicitation, user.idt);
            setCancelFlag(true);
          },
        },
        {
          text: 'Não',
        },
      ],
    );
  }

  function renderItem(item, index) {
    return (
      <DonationBox key={index} onPress={() => openDetail(item.id)}>
        <DonationIconBox>{statusIcon[item.status]}</DonationIconBox>
        <DonationTextBox>
          <DonationTitle weight="bold">
            {capitalizeFirstLetter(item.title)}
          </DonationTitle>
          <DonationStatus color={statusColor[item.status]}>
            {statusHuman[item.status]}
          </DonationStatus>
        </DonationTextBox>
      </DonationBox>
    );
  }

  function renderPageItem(item, index) {
    return (
      <PageModal>
        <ImageItemModal
          source={{uri: 'data:image/png;base64,' + item.img}}
          resizeMode={'contain'}
        />
        <SubtitleModal>Descrição</SubtitleModal>
        <DescriptionItemModal>{item.desc}</DescriptionItemModal>
        <ValidityTextModal>
          Validade:{' '}
          {item.expirationDate.split('T')[0].split('-').reverse().join('/')}
        </ValidityTextModal>
        {detailData?.status !== 'DONE' && detailData?.status !== 'CANCELED' ? (
          <CancelButton onPress={() => handleCancel(item.solicitationId)}>
            <CancelText>CANCELAR</CancelText>
          </CancelButton>
        ) : (
          <></>
        )}
      </PageModal>
    );
  }

  return (
    <Container>
      <Header title="DOAÇÕES" onBackPress={() => navigation.goBack()} />
      <Modal visible={visibleDetail}>
        <ModalContainer>
          <Header
            title={
              detailData?.title ? capitalizeFirstLetter(detailData?.title) : ''
            }
            onBackPress={() => setVisibleDetail(false)}
            marginTop={'0px'}
          />
          <StatusModalBox>
            <StatusLabel weight="bold">Status:</StatusLabel>
            <StatusText weight="bold" color={statusColor[detailData?.status]}>
              {statusHuman[detailData?.status]}
            </StatusText>
          </StatusModalBox>
          {detailData?.history ? (
            detailData.history[detailData.history.length - 1].charityId ? (
              <CharityModalBox>
                <CharityLabel weight="bold">Instituição:</CharityLabel>
                <CharityText>
                  {
                    detailData?.history[detailData.history.length - 1].charityId
                      ?.name
                  }
                </CharityText>
              </CharityModalBox>
            ) : (
              <></>
            )
          ) : (
            <></>
          )}

          <AnonymousModalBox>
            <AnonymousLabel weight="bold">Anônima:</AnonymousLabel>
            <AnonymousText>
              {detailData?.nameless ? 'Sim' : 'Não'}
            </AnonymousText>
          </AnonymousModalBox>

          <PickupModalBox>
            <PickupLabel weight="bold">Retirada:</PickupLabel>
            <PickupText>
              {detailData?.pickUp
                ? 'Sim, ' +
                  detailData?.address.street +
                  ' ' +
                  detailData?.address.number +
                  ', ' +
                  detailData?.address.district +
                  ' - ' +
                  detailData?.address.cep +
                  '. ' +
                  detailData?.address.city +
                  ' - ' +
                  detailData?.address.state +
                  '.\nComplemento: ' +
                  detailData?.address.complement
                : 'Não'}
            </PickupText>
          </PickupModalBox>

          <FlatList
            data={detailData?.itemList}
            renderItem={({item, index}) => renderPageItem(item, index)}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
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
        </ModalContainer>
      </Modal>
      <DonationList
        data={solicitationList}
        renderItem={({item, index}) => renderItem(item, index)}
      />
    </Container>
  );
}

const mapStateToProps = state => {
  return {
    solicitation: state.solicitation,
  };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getSolicitationsByUser,
      getSolicitationDetail,
      cancelSolicitation,
    },
    dispatch,
  );

export default connect(mapStateToProps, mapDispatchToProps)(MyDonations);
