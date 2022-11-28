import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {
  Alert,
  Dimensions,
  FlatList,
  Image,
  ImageBackground,
  Modal,
} from 'react-native';
import AntDesgin from 'react-native-vector-icons/AntDesign';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {Calendar, CalendarUtils, LocaleConfig} from 'react-native-calendars';
import ImagePicker from 'react-native-image-crop-picker';

import AddImageIcon from '../../../assets/icons/add-image.svg';
import {Input} from '../../components/Input';
import {
  AddButtonModal,
  AddImageButton,
  AddImageText,
  AddItemButton,
  AddItemModal,
  AddItemText,
  AddTextModal,
  BackModalButton,
  BackModalText,
  CalendarBoxButton,
  CalendarContainer,
  Container,
  ContainerModal,
  Form,
  InputBox,
  InputLabel,
  InstitutionAddress,
  InstitutionBox,
  InstitutionListBox,
  InstitutionLogo,
  InstitutionText,
  InstitutionTextBox,
  ItemBox,
  ItemTitle,
  ItemValidity,
  SelectDateButton,
  SelectDateText,
  SelectInstitutionText,
  SolicitationButton,
  SolicitationText,
  SubtitleText,
  TitleText,
} from './styles';
import {RadioButton} from '../../components/RadioButton';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {TextArea} from '../../components/TextArea';
import {useNavigation} from '@react-navigation/native';
import {Header} from '../../components/Header';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {createSolicitation} from '../../actions/Solicitation';
import {getAllCharities} from '../../actions/Charity';
import {getUser} from '../../routes';

LocaleConfig.locales['fr'] = {
  monthNames: [
    'Janeiro',
    'Fevereiro',
    'Mar;o',
    'Abril',
    'Maio',
    'Junho',
    'Julho',
    'Agosto',
    'Setembro',
    'Outubro',
    'Novembro',
    'Dezembro',
  ],
  monthNamesShort: [
    'Jan.',
    'Fev.',
    'Mar.',
    'Abr.',
    'Mai.',
    'Jun.',
    'Jul..',
    'Ago.',
    'Set.',
    'Out.',
    'Nov.',
    'Dez.',
  ],
  dayNames: [
    'Domingo',
    'Segunda',
    'Terca', //MUDAR TERCA
    'Quarta',
    'Quinta',
    'Sexta',
    'Sabado',
  ],
  dayNamesShort: ['Dom.', 'Seg.', 'Ter.', 'Qua.', 'Qui.', 'Sex.', 'Sab.'],
  today: 'Hoje',
};
LocaleConfig.defaultLocale = 'fr';

function OpenSolicitation(props) {
  const [donateList, setDonateList] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [calendarVisible, setCalendarVisible] = useState(false);
  const [validity, setValidity] = useState('');
  const [dateOption, setDateOption] = useState(null);
  const [description, setDescription] = useState('');
  const [withdraw, setWithdraw] = useState(false);
  const [institutionSelected, setInstitutionSelected] = useState([]);
  const [load, setLoad] = useState(false);
  const [anonymous, setAnonymous] = useState(false);
  const [imagePreview, setImagePreview] = useState('');
  const [images, setImages] = useState([]);
  const [createFlag, setCreateFlag] = useState(false);
  const [expirationDate, setExpirationDate] = useState('');
  const [institutionFlag, setInstitutionFlag] = useState(false);
  const [charities, setCharities] = useState([]);

  const navigation = useNavigation();

  useEffect(() => {
    async function getInstitutions() {
      const {getAllCharities} = props;

      await getAllCharities();
      setInstitutionFlag(true);
    }
    getInstitutions();
  }, []);

  useEffect(() => {
    if (createFlag) {
      const {solicitation} = props;
      console.log(solicitation);
    }
    setCreateFlag(false);
  }, [createFlag]);

  useEffect(() => {
    if (institutionFlag) {
      const {charityData, getAllSuccess} = props.charity;

      if (getAllSuccess) {
        setCharities(charityData.content);
      }
    }
    setInstitutionFlag(false);
  }, [institutionFlag]);

  function renderItem(item: any, index: any) {
    var title =
      item.title.length > 20
        ? item.title.substring(0, 20) + '...'
        : item.title.substring(0, 20);

    return (
      <ItemBox key={index}>
        <ItemTitle weight={'bold'}>{title}</ItemTitle>
        <ItemValidity>{formatDate(item.validity)}</ItemValidity>
      </ItemBox>
    );
  }

  function formatDate(input: any) {
    var datePart = input.match(/\d+/g),
      year = datePart[0],
      month = datePart[1],
      day = datePart[2];

    return day + '/' + month + '/' + year;
  }

  function setOptionToDate(value) {
    setDateOption(value);
    if (value) {
      const date = new Date();
      date.setDate(date.getDate() + value);
      setExpirationDate(date.toISOString());
      setValidity(date.toISOString().split('T')[0]);
    } else {
      setValidity('');
    }
  }

  function addNewItem() {
    if (!description || !validity) {
      alert('Preencha os campos para adicionar um item');
    } else {
      const item = {
        title: description,
        validity,
        expirationDate,
      };

      donateList.push(item);
      images.push(imagePreview);
      setImagePreview('');
      setValidity('');
      setDescription('');
      setDateOption(null);
      setModalVisible(false);
    }
  }

  async function selectInstitution(institution, isSelected) {
    if (isSelected) {
      setInstitutionSelected(
        institutionSelected.filter(id => id !== institution.idt),
      );
    } else {
      institutionSelected.push(institution.idt);

      setLoad(!load);
    }
  }

  function renderInstitution(institution, index) {
    const isSelected =
      institutionSelected.indexOf(institution.idt).toString() !== '-1';
    return (
      <InstitutionBox
        selected={isSelected}
        onPress={() => {
          if (institutionSelected.length < 10) {
            selectInstitution(institution, isSelected);
          } else {
            Alert.alert(
              'Atenção!',
              'Você atingiu o limite de instituições priorizadas.',
            );
          }
        }}>
        <InstitutionLogo source={{uri: institution.logo}} />
        <InstitutionTextBox>
          <InstitutionText weight="bold">{institution.name}</InstitutionText>
          <InstitutionAddress>
            {institution.address.city} - {institution.address.state}
          </InstitutionAddress>
        </InstitutionTextBox>
      </InstitutionBox>
    );
  }

  async function openPicker() {
    await ImagePicker.openPicker({
      width: 300,
      height: 200,
      cropping: true,
      compressImageQuality: 1,
      mediaType: 'photo',
      freeStyleCropEnabled: true,
    }).then(image => {
      const img = {
        uri: image.path,
        type: image.mime,
        name: image.filename,
        width: image.width,
        height: image.height,
      };
      setImagePreview(img);
    });
  }

  async function handleSubmitSolicitation() {
    const {createSolicitation} = props;
    const address = {};
    const userId = (await getUser()).idt;
    await createSolicitation(
      address,
      institutionSelected,
      anonymous,
      withdraw,
      donateList,
      'title',
      userId,
      images,
    );
    setCreateFlag(true);
  }

  const automatizeDates = [
    {title: '1 dia', value: 1},
    {title: '3 dias', value: 3},
    {title: '15 dias', value: 15},
    {title: '1 mes', value: 30},
    {title: '2 meses', value: 60},
    {title: '3 meses', value: 90},
  ];

  return (
    <Container>
      <Modal visible={calendarVisible} animationType={'slide'}>
        <CalendarContainer>
          <Calendar
            minDate={new Date().toString()}
            onDayPress={day => {
              setValidity(day.dateString);
            }}
            // Month format in calendar title. Formatting values: http://arshaw.com/xdate/#Formatting
            monthFormat={'MMMM yyyy'}
            // Handler which gets executed when press arrow icon left. It receive a callback can go back month
            onPressArrowLeft={subtractMonth => subtractMonth()}
            // Handler which gets executed when press arrow icon right. It receive a callback can go next month
            onPressArrowRight={addMonth => addMonth()}
            // Disable all touch events for disabled days. can be override with disableTouchEvent in markedDates
            disableAllTouchEventsForDisabledDays={true}
            // Enable the option to swipe between months. Default = false
            enableSwipeMonths={true}
            markedDates={{
              [validity]: {selected: true},
            }}
            renderArrow={direction => (
              <SimpleLineIcons
                name={'arrow-' + direction}
                size={18}
                color={'#036bb9'}
              />
            )}
            theme={{
              textDayFontFamily: 'Poppins-Regular',
              textMonthFontFamily: 'Poppins-Regular',
              todayButtonFontFamily: 'Poppins-Regular',
              textDayHeaderFontFamily: 'Poppins-Regular',
              todayTextColor: '#036bb9',
              selectedDayBackgroundColor: '#036bb9',
            }}
          />
          <SelectDateButton
            onPress={() => setCalendarVisible(false)}
            disabled={!!!validity}
            disabledStyles={!!!validity}>
            <SelectDateText>Selecionar dia</SelectDateText>
          </SelectDateButton>
          <BackModalButton>
            <BackModalText onPress={() => setCalendarVisible(false)}>
              Voltar
            </BackModalText>
          </BackModalButton>
        </CalendarContainer>
      </Modal>

      <AddItemModal visible={modalVisible}>
        <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
          <ContainerModal>
            <Header
              title="Adicionar item"
              onBackPress={() => setModalVisible(false)}
            />

            <AddImageButton onPress={() => openPicker()}>
              {imagePreview ? (
                <>
                  <Image
                    source={{uri: imagePreview?.uri}}
                    style={{
                      width: imagePreview?.width,
                      height: imagePreview?.height,
                    }}
                  />
                  <AddImageText>Alterar imagem</AddImageText>
                </>
              ) : (
                <>
                  <AddImageText>Anexar imagem</AddImageText>
                  <AddImageIcon width={100} height={68} />
                </>
              )}
            </AddImageButton>

            <Form>
              <CalendarBoxButton onPress={() => setCalendarVisible(true)}>
                <InputBox>
                  <InputLabel>Validade</InputLabel>
                  <Input
                    value={validity && formatDate(validity)}
                    marginTop={'0px'}
                    placeholder={'dd/mm/aaaa'}
                    autoCapitalize={'none'}
                    editable={false}
                    rightIcon={
                      <MaterialIcons
                        name={'calendar-today'}
                        size={24}
                        color={`#B8BCCA`}
                      />
                    }
                  />
                </InputBox>
              </CalendarBoxButton>
              <RadioButton
                data={automatizeDates}
                userOption={dateOption}
                setUserOption={setOptionToDate}
              />

              <InputBox>
                <InputLabel>Descrição</InputLabel>
                <TextArea value={description} onChangeText={setDescription} />
              </InputBox>

              <AddButtonModal onPress={() => addNewItem()}>
                <AddTextModal>Adicionar</AddTextModal>
              </AddButtonModal>
            </Form>
          </ContainerModal>
        </KeyboardAwareScrollView>
      </AddItemModal>

      <Header
        title="SOLICITAÇÃO"
        onBackPress={() => navigation.navigate('Home')}
      />

      <TitleText>O que você gostaria de doar?</TitleText>

      <SubtitleText>Item/itens</SubtitleText>
      {donateList.map((item, index) => renderItem(item, index))}

      <AddItemButton onPress={() => setModalVisible(true)}>
        <AddItemText weight={'bold'}>+ Adicionar novo item</AddItemText>
      </AddItemButton>
      <Form>
        <RadioButton
          data={[{value: true, title: 'Retirada no endereço'}]}
          userOption={withdraw}
          setUserOption={setWithdraw}
          boldText={'bold'}
        />
        <Input
          value={validity && formatDate(validity)}
          marginTop={'0px'}
          placeholder={'Endereço'}
          autoCapitalize={'none'}
          editable={!!withdraw}
        />

        <SelectInstitutionText>
          Selecione até 10 instituições para priorizar
        </SelectInstitutionText>
        <InstitutionListBox>
          {charities.map((institution, index) =>
            renderInstitution(institution, index),
          )}
        </InstitutionListBox>

        <RadioButton
          data={[{value: true, title: 'Doar de forma anônima'}]}
          userOption={anonymous}
          setUserOption={setAnonymous}
          boldText={'bold'}
        />

        <SolicitationButton onPress={() => handleSubmitSolicitation()}>
          <SolicitationText weight="bold">Enviar Solicitação</SolicitationText>
        </SolicitationButton>
      </Form>
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
      createSolicitation,
      getAllCharities,
    },
    dispatch,
  );

export default connect(mapStateToProps, mapDispatchToProps)(OpenSolicitation);
