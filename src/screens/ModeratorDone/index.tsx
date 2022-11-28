import React, {useState, useEffect} from 'react';
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
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {
  getWaitingSolicitation,
  getSolicitationDetail,
  doneSolicitation,
  cancelModeratorSolicitation,
  getModerator,
} from '../../actions/Solicitation';
import {getUser} from '../../routes';

function ModeratorDone(props) {
  const [selectedSolicitation, setSelectedSolicitation] = useState();
  const [visible, setVisible] = useState(false);
  const [solicitationList, setSolicitationList] = useState([]);
  const [solicitationFlag, setSolicitationFlag] = useState(false);
  const [detailFlag, setDetailFlag] = useState(false);
  const [moderatorIdt, setModeratorIdt] = useState();
  const [moderatorFlag, setModeratorFlag] = useState(false);
  const [acceptFlag, setAcceptFlag] = useState(false);
  const [refuseFlag, setRefuseFlag] = useState(false);
  const [refresh, setRefresh] = useState(false);

  const navigation = useNavigation();

  const width = Dimensions.get('window').width;

  useEffect(() => {
    async function getCharityId() {
      const {getModerator} = props;
      const moderatorId = (await getUser()).moderatorId;
      setModeratorIdt(moderatorId);
      await getModerator(moderatorId);
      setModeratorFlag(true);
    }
    getCharityId();
  }, [refresh]);

  useEffect(() => {
    async function handleSolicitation() {
      if (moderatorFlag) {
        const {moderatorData, getModeratorSuccess} = props.solicitation;
        if (getModeratorSuccess) {
          const {getWaitingSolicitation} = props;
          await getWaitingSolicitation(moderatorData.charity.idt);
          setSolicitationFlag(true);
        }
      }
      setModeratorFlag(false);
    }
    handleSolicitation();
  }, [moderatorFlag]);

  useEffect(() => {
    if (solicitationFlag) {
      const {waitingSolicitationSuccess, solicitationData} = props.solicitation;
      if (waitingSolicitationSuccess) {
        setSolicitationList(solicitationData);
      }
    }
    setSolicitationFlag(false);
  }, [solicitationFlag]);

  useEffect(() => {
    if (detailFlag) {
      const {getSolicitationDetailSuccess, solicitationDetail} =
        props.solicitation;
      if (getSolicitationDetailSuccess) {
        setSelectedSolicitation(solicitationDetail);
        setVisible(true);
      }
    }
    setDetailFlag(false);
  }, [detailFlag]);

  useEffect(() => {
    if (acceptFlag) {
      const {doneSolicitationSuccess} = props.solicitation;
      if (doneSolicitationSuccess) {
        setRefresh(!refresh);
        setVisible(false);
      }
    }
    setAcceptFlag(false);
  }, [acceptFlag]);

  useEffect(() => {
    if (refuseFlag) {
      const {cancelModeratorSolicitationSuccess} = props.solicitation;
      if (cancelModeratorSolicitationSuccess) {
        setRefresh(!refresh);
        setVisible(false);
      }
    }
    setRefuseFlag(false);
  }, [refuseFlag]);

  async function openSolicitationModal(solicitationId) {
    const {getSolicitationDetail} = props;
    await getSolicitationDetail(solicitationId);
    setDetailFlag(true);
  }

  function renderItem(item, index) {
    return (
      <DonationButton
        key={index}
        onPress={() => openSolicitationModal(item.id)}>
        <DonationIconBox>
          <AntDesign name="clockcircleo" size={40} color="black" />
        </DonationIconBox>
        <DonationTextBox>
          <DonationTitle weight="bold">
            {item.nameless ? 'Doador anônimo' : item.user.name}: {item.title}
          </DonationTitle>
          <DonationStatus>
            {item.dateCreate.split('T')[0].split('-').reverse().join('/')}
          </DonationStatus>
        </DonationTextBox>
      </DonationButton>
    );
  }

  function renderPageItem(item, index) {
    return (
      <PageModal key={index}>
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
        <SubtitleModal>Endereço:</SubtitleModal>
        <AddressTextModal>
          {selectedSolicitation?.pickUp
            ? selectedSolicitation?.address.street +
              ', ' +
              selectedSolicitation?.address.number +
              '. ' +
              selectedSolicitation?.address.cep +
              '. ' +
              selectedSolicitation?.address.city +
              ' - ' +
              selectedSolicitation?.address.state
            : 'Irá entregar na instituição.'}
        </AddressTextModal>
      </PageModal>
    );
  }

  async function handleDone(idSolicitation) {
    const {doneSolicitation} = props;
    await doneSolicitation(idSolicitation, moderatorIdt);
    setAcceptFlag(true);
  }
  async function handleCancel(idSolicitation) {
    const {cancelModeratorSolicitation} = props;
    await cancelModeratorSolicitation(idSolicitation, moderatorIdt);
    setRefuseFlag(true);
  }

  return (
    <Container>
      <Modal visible={visible}>
        <ContainerModal>
          <TitleContainer>
            <NameModal>
              {selectedSolicitation?.nameless
                ? 'Doador anônimo'
                : selectedSolicitation?.user.name}
            </NameModal>
            <IconButton onPress={() => setVisible(false)}>
              <AntDesign name="close" size={30} />
            </IconButton>
          </TitleContainer>
          <FlatList
            data={selectedSolicitation?.itemList}
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
            <RefuseButtonModal
              onPress={() => handleCancel(selectedSolicitation?.id)}>
              <RefuseTextButtonModal>Cancelar</RefuseTextButtonModal>
            </RefuseButtonModal>
            <AcceptButtonModal
              onPress={() => handleDone(selectedSolicitation?.id)}>
              <AcceptTextButtonModal weight="bold">
                Concluir
              </AcceptTextButtonModal>
            </AcceptButtonModal>
          </BoxButton>
        </ContainerModal>
      </Modal>
      <Header
        title="SOLICITAÇÕES PENDENTES"
        onBackPress={() => navigation.goBack()}
      />
      <FlatList
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
      getWaitingSolicitation,
      getSolicitationDetail,
      doneSolicitation,
      cancelModeratorSolicitation,
      getModerator,
    },
    dispatch,
  );

export default connect(mapStateToProps, mapDispatchToProps)(ModeratorDone);
