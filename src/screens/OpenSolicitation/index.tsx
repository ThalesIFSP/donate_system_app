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

  const navigation = useNavigation();

  useEffect(() => {
    if (createFlag) {
      const {solicitation} = props;
      console.log(solicitation);
    }
  }, [createFlag]);

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
      console.log(description, validity);
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
        institutionSelected.filter(id => id !== institution.id),
      );
      console.log(institutionSelected);
    } else {
      institutionSelected.push(institution.id);

      setLoad(!load);
    }
  }

  function renderInstitution(institution, index) {
    const isSelected =
      institutionSelected.indexOf(institution.id).toString() !== '-1';
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
            {institution.city} - {institution.uf}
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

  const institutionList = [
    {
      logo: 'https://img.freepik.com/vetores-gratis/hospital-logo-design-vector-medical-cross_53876-136743.jpg',
      name: 'Hospital',
      city: 'Votuporanga',
      uf: 'SP',
      id: 1,
    },
    {
      logo: 'data:image/png;base64,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',
      name: 'Lar dos Velhinhos',
      city: 'Votuporanga',
      uf: 'SP',
      id: 2,
    },
    {
      logo: 'https://condeca.com.br/sites/default/files/styles/exibicaoo_instituicao/public/logo_apae_1.jpg?itok=ZDE672y2',
      name: 'APAE',
      city: 'Fernandópolis',
      uf: 'SP',
      id: 3,
    },
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
          {institutionList.map((institution, index) =>
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
    solicitation: state.solicitation,
  };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      createSolicitation,
    },
    dispatch,
  );

export default connect(mapStateToProps, mapDispatchToProps)(OpenSolicitation);
