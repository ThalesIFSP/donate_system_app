import React, {useEffect, useState} from 'react';
import {Modal, FlatList, Dimensions} from 'react-native';

import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Feather from 'react-native-vector-icons/Feather';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {useNavigation} from '@react-navigation/native';

import {Header} from '../../components/Header';
import {
  CharityBox,
  CharityLabel,
  CharityText,
  Container,
  NotificationButton,
  NotificationDate,
  NotificationIconBox,
  NotificationList,
  NotificationTextBox,
  NotificationTitle,
} from './styles';
import {
  getSolicitationHistory,
  getSolicitationDetail,
} from '../../actions/Solicitation';
import {getUser} from '../../routes';
import {
  AnonymousLabel,
  AnonymousModalBox,
  AnonymousText,
  DescriptionItemModal,
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
} from '../MyDonations/styles';
import {getCharity} from '../../actions/Charity';

function MyNotifications(props) {
  const [historyFlag, setHistoryFlag] = useState(false);
  const [historyList, setHistoryList] = useState([]);
  const [visibleDetail, setVisibleDetail] = useState(false);
  const [detailData, setDetailData] = useState();
  const [detailFlag, setDetailFlag] = useState(false);
  const [charityName, setCharityName] = useState('');

  const navigation = useNavigation();
  const {width} = Dimensions.get('window');

  const statusIcon = {
    OPENED: <AntDesign name="clockcircleo" size={40} color="black" />,
    ACCEPTED: <AntDesign name="checkcircleo" size={40} color="black" />,
    WAITING_DELIVERY: <AntDesign name="checkcircleo" size={40} color="black" />,
    REFUSED: <Feather name="x-circle" size={40} color="black" />,
    CANCELED: <Feather name="x-circle" size={40} color="black" />,
    DONE: (
      <MaterialCommunityIcons
        name="map-marker-circle"
        size={40}
        color="black"
      />
    ),
  };

  const statusHuman = {
    OPENED: 'Aberta',
    ACCEPTED: 'Aceita',
    REFUSED: 'Cancelada',
    CANCELED: 'Cancelada',
    WAITING_DELIVERY: 'Aceita',
    DONE: 'Finalizada',
  };

  const statusColor = {
    OPENED: '#FF8652',
    ACCEPTED: '#2390F4',
    REFUSED: '#ccaccc',
    CANCELED: '#FF0000',
    WAITING_DELIVERY: '#5A959A',
    DONE: '#589235',
  };

  useEffect(() => {
    async function handleHistory() {
      const {getSolicitationHistory} = props;
      const idUser = (await getUser()).idt;
      await getSolicitationHistory(idUser);
      setHistoryFlag(true);
    }
    handleHistory();
  }, []);

  useEffect(() => {
    if (historyFlag) {
      const {solicitationHistorySuccess, solicitationData} = props.solicitation;

      if (solicitationHistorySuccess) {
        setHistoryList(solicitationData);
      }
    }
    setHistoryFlag(false);
  }, [historyFlag]);

  useEffect(() => {
    if (detailFlag) {
      const {getSolicitationDetailSuccess, solicitationDetail} =
        props.solicitation;
      if (getSolicitationDetailSuccess) {
        setDetailData(solicitationDetail);
        setVisibleDetail(true);
      }
      const {getCharitySuccess, charityData} = props.charity;
      if (getCharitySuccess && charityName !== 'false') {
        setCharityName(charityData.name);
      }
    }
    setDetailFlag(false);
  }, [detailFlag]);

  function convertDate(date) {
    return date.split('T')[0].split('-').reverse().join('/');
  }

  function convertDateToTime(date) {
    return date.split('T')[1].split('.')[0];
  }

  function capitalizeFirstLetter(string: string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  async function openDetail(solicitationId: number, charityId) {
    setCharityName('');
    const {getSolicitationDetail, getCharity} = props;
    await getSolicitationDetail(solicitationId);
    if (charityId) {
      await getCharity(charityId);
    } else {
      setCharityName('false');
    }
    setDetailFlag(true);
  }

  function renderItem(item, index) {
    return (
      <NotificationButton
        key={index}
        onPress={() => openDetail(item.solicitation.id, item.charityId)}>
        <NotificationIconBox>{statusIcon[item.status]}</NotificationIconBox>
        <NotificationTextBox>
          <NotificationTitle weight="bold">
            Sua{' '}
            {statusHuman[item.status] === 'Aberta' ||
            statusHuman[item.status] === 'Cancelada' ||
            statusHuman[item.status] === 'Aceita'
              ? 'solicitação '
              : 'doação '}
            foi {statusHuman[item.status].toLowerCase()}
          </NotificationTitle>
          <NotificationDate>
            {convertDate(item.dateCreate)} às{' '}
            {convertDateToTime(item.dateCreate)}
          </NotificationDate>
        </NotificationTextBox>
      </NotificationButton>
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
      </PageModal>
    );
  }

  return (
    <Container>
      <Header
        title="NOTIFICAÇÕES"
        onBackPress={() => {
          navigation.goBack();
        }}
      />

      <Modal visible={visibleDetail}>
        <ModalContainer>
          <Header
            title={
              detailData?.title ? capitalizeFirstLetter(detailData?.title) : ''
            }
            onBackPress={() => setVisibleDetail(false)}
            marginTop={'0px'}
          />
          {charityName !== 'false' ? (
            <CharityBox>
              <CharityLabel weight="bold">Instituição:</CharityLabel>
              <CharityText>{charityName}</CharityText>
            </CharityBox>
          ) : (
            <></>
          )}

          <StatusModalBox>
            <StatusLabel weight="bold">Status:</StatusLabel>
            <StatusText weight="bold" color={statusColor[detailData?.status]}>
              {statusHuman[detailData?.status]}
            </StatusText>
          </StatusModalBox>

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

      <NotificationList
        data={historyList}
        renderItem={({item, index}) => renderItem(item, index)}
      />
    </Container>
  );
}

const mapStateToProps = state => {
  return {
    charity: state.charity,
    solicitation: state.solicitation,
  };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getSolicitationHistory,
      getSolicitationDetail,
      getCharity,
    },
    dispatch,
  );

export default connect(mapStateToProps, mapDispatchToProps)(MyNotifications);
