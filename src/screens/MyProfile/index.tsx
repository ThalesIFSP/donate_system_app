import {useNavigation} from '@react-navigation/native';
import React, {useState, useEffect} from 'react';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {editSendNotification, editUser} from '../../actions/Auth';
import {Header} from '../../components/Header';
import {Input} from '../../components/Input';
import {RadioButton} from '../../components/RadioButton';
import {getUser, setUser} from '../../routes';
import {
  Container,
  EditButton,
  EditButtonText,
  Form,
  RowBox,
  RowDivide1,
  RowDivide2,
  Subtitle,
} from './styles';

function MyProfile(props) {
  const [userInfo, setUserInfo] = useState({
    address: {
      cep: 'string',
      city: 'string',
      complement: 'string',
      district: 'string',
      number: 0,
      state: 'string',
      street: 'string',
    },
    name: '',
    idt: '',
    sendEmail: false,
    sendWhatsapp: false,
    phone: '',
  });
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [cep, setCep] = useState('');
  const [city, setCity] = useState('');
  const [uf, setUf] = useState('');
  const [street, setStreet] = useState('');
  const [number, setNumber] = useState('');
  const [district, setDistrict] = useState('');
  const [sendEmail, setSendEmail] = useState(false);
  const [sendWhatsapp, setSendWhatsapp] = useState(false);
  const [editFlag, setEditFlag] = useState(false);

  const navigation = useNavigation();

  useEffect(() => {
    async function initializeUser() {
      const user = await getUser();
      setUserInfo(user);
      setName(user.name);
      setEmail(user.email);
      setPhone(user.phone);
      setCep(user.address.cep);
      setUf(user.address.state);
      setStreet(user.address.street);
      setNumber(user.address.number);
      setDistrict(user.address.district);
      setCity(user.address.city);
      setSendEmail(user.sendEmail);
      setSendWhatsapp(user.sendWhatsApp);
    }
    initializeUser();
  }, []);

  useEffect(() => {
    if (editFlag) {
      const {editUserSuccess} = props.auth;
      if (editUserSuccess) {
        console.log('Alterou!');
      }
    }
    setEditFlag(false);
  }, [editFlag]);

  async function handleEditNotification(email, whatsapp) {
    const {editSendNotification} = props;
    await editSendNotification(userInfo.idt, email, whatsapp);
  }

  async function handleEdit() {
    const {editUser} = props;
    const newUser = userInfo;
    newUser.address.cep = cep;
    newUser.address.city = city;
    newUser.address.district = district;
    newUser.address.number = +number;
    newUser.address.street = street;
    newUser.phone = phone;
    newUser.name = name;
    newUser.sendEmail = sendEmail;
    newUser.sendWhatsapp = sendWhatsapp;

    await editUser(userInfo.idt, newUser);
  }

  return (
    <Container>
      <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
        <Header title="MEUS DADOS" onBackPress={() => navigation.goBack()} />

        <Form>
          <Subtitle>Conta</Subtitle>
          <Input
            placeholder={'Nome'}
            keyboardType={`default`}
            value={name}
            onChangeText={setName}
            marginTop={'0%'}
          />

          <Input
            placeholder={'Email'}
            keyboardType={`default`}
            value={email}
            onChangeText={setEmail}
            editable={false}
          />

          <Input
            placeholder={'Telefone'}
            keyboardType={`default`}
            value={phone}
            onChangeText={setPhone}
          />
          <Subtitle>Receber mensagem</Subtitle>
          <RadioButton
            data={[{title: 'Email', value: true}]}
            userOption={sendEmail}
            setUserOption={async option => {
              handleEditNotification(!!option, sendWhatsapp);
              const newUser = userInfo;
              newUser.sendEmail = !!option;
              await setUser(newUser);
              setSendEmail(!!option);
            }}
            icon={<FontAwesome name="envelope-o" color={'black'} size={20} />}
          />
          <RadioButton
            data={[{title: 'WhatsApp', value: true}]}
            userOption={sendWhatsapp}
            setUserOption={async option => {
              handleEditNotification(sendEmail, !!option);
              const newUser = userInfo;
              newUser.sendWhatsapp = !!option;
              await setUser(newUser);
              setSendWhatsapp(!!option);
            }}
            icon={<FontAwesome name="whatsapp" color={'black'} size={20} />}
          />
          <Subtitle>Endereço</Subtitle>

          <Input
            placeholder={'CEP'}
            keyboardType={`default`}
            autoCapitalize={'none'}
            value={cep}
            onChangeText={setCep}
            marginTop={'0%'}
          />

          <RowBox>
            <RowDivide1>
              <Input
                placeholder={'Cidade'}
                keyboardType={`default`}
                autoCapitalize={'none'}
                value={city}
                onChangeText={setCity}
              />
            </RowDivide1>
            <RowDivide2>
              <Input
                placeholder={'UF'}
                keyboardType={`default`}
                autoCapitalize={'characters'}
                value={uf}
                onChangeText={setUf}
              />
            </RowDivide2>
          </RowBox>

          <RowBox>
            <RowDivide1>
              <Input
                placeholder={'Rua'}
                keyboardType={`default`}
                autoCapitalize={'sentences'}
                value={street}
                onChangeText={setStreet}
              />
            </RowDivide1>
            <RowDivide2>
              <Input
                placeholder={'Nº'}
                keyboardType={`default`}
                autoCapitalize={'none'}
                value={number + ''}
                onChangeText={setNumber}
              />
            </RowDivide2>
          </RowBox>

          <Input
            placeholder={'Bairro'}
            keyboardType={`default`}
            value={district}
            onChangeText={setDistrict}
          />

          <EditButton onPress={() => handleEdit()}>
            <EditButtonText>Alterar</EditButtonText>
          </EditButton>
        </Form>
      </KeyboardAwareScrollView>
    </Container>
  );
}
const mapStateToProps = state => {
  return {
    auth: state.auth,
  };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      editSendNotification,
      editUser,
    },
    dispatch,
  );

export default connect(mapStateToProps, mapDispatchToProps)(MyProfile);
