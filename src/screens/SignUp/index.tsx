import React, {useEffect, useState} from 'react';
import {Alert} from 'react-native';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {initializeAxios} from '../../api/base';

import {Input} from '../../components/Input';
import {
  Container,
  Form,
  IconButton,
  RegisterButton,
  RegisterButtonText,
  RowBox,
  RowDivide1,
  RowDivide2,
} from './styles';
import {register} from '../../actions/Auth';
import {useNavigation} from '@react-navigation/native';

function SignUp(props: any) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [cpf, setCpf] = useState('');
  const [cep, setCep] = useState('');
  const [uf, setUf] = useState('');
  const [city, setCity] = useState('');
  const [district, setDistrict] = useState('');
  const [street, setStreet] = useState('');
  const [number, setNumber] = useState('');
  const [complement, setComplement] = useState('');
  const [pass, setPass] = useState('');
  const [passVisible, setPassVisible] = useState(true);
  const [registerFlag, setRegisterFlag] = useState(false);

  const navigation = useNavigation();

  useEffect(() => {
    async function initialize() {
      await initializeAxios();
      cleanFields();
    }
    initialize();
  }, []);

  useEffect(() => {
    if (registerFlag) {
      const {auth} = props;
      const {registerError, registerSuccess, errorMessage} = auth;
      if (registerSuccess) {
        Alert.alert('Sucesso', 'Cadastro realizado com sucesso!', [
          {
            text: 'Ir para o login',
            onPress: () => {
              cleanFields();
              navigation.navigate('SignIn');
            },
          },
        ]);
      } else if (registerError) {
        Alert.alert('Erro', errorMessage);
      }
    }
    setRegisterFlag(false);
  }, [registerFlag]);

  async function handleRegister() {
    const {register} = props;
    const address = {
      cep,
      city,
      complement,
      district,
      number,
      state: uf,
      street,
    };

    await register(address, '15000', cpf, email, name, phone, pass);
    setRegisterFlag(true);
  }

  async function cleanFields() {
    setName('');
    setEmail('');
    setPhone('');
    setCpf('');
    setCep('');
    setUf('');
    setCity('');
    setDistrict('');
    setStreet('');
    setNumber('');
    setComplement('');
    setPass('');
    setPassVisible(true);
  }

  return (
    <Container>
      <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
        <Form>
          <Input
            placeholder={'Nome'}
            keyboardType={`default`}
            autoCapitalize={'sentences'}
            value={name}
            onChangeText={setName}
          />
          <Input
            placeholder={'Email'}
            keyboardType={`email-address`}
            autoCapitalize={'none'}
            value={email}
            onChangeText={setEmail}
          />
          <Input
            placeholder={'Telefone'}
            keyboardType={`phone-pad`}
            autoCapitalize={'none'}
            value={phone}
            onChangeText={setPhone}
          />

          <Input
            placeholder={'CPF'}
            keyboardType={`default`}
            autoCapitalize={'none'}
            value={cpf}
            onChangeText={setCpf}
          />
          <RowBox>
            <RowDivide1>
              <Input
                placeholder={'CEP'}
                keyboardType={`default`}
                autoCapitalize={'none'}
                value={cep}
                onChangeText={setCep}
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

          <Input
            placeholder={'Cidade'}
            keyboardType={`default`}
            autoCapitalize={'words'}
            value={city}
            onChangeText={setCity}
          />

          <Input
            placeholder={'Bairro'}
            keyboardType={`default`}
            autoCapitalize={'sentences'}
            value={district}
            onChangeText={setDistrict}
          />

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
                value={number}
                onChangeText={setNumber}
              />
            </RowDivide2>
          </RowBox>

          <Input
            placeholder={'Complemento'}
            keyboardType={`default`}
            autoCapitalize={'none'}
            value={complement}
            onChangeText={setComplement}
          />

          <Input
            placeholder={'Senha'}
            secureTextEntry={passVisible}
            autoCapitalize={'none'}
            value={pass}
            onChangeText={setPass}
            rightIcon={
              <IconButton onPress={() => setPassVisible(!passVisible)}>
                {passVisible ? (
                  <Ionicons name={'eye-outline'} size={24} color={`#A6A6A6`} />
                ) : (
                  <Ionicons
                    name={'eye-off-outline'}
                    size={24}
                    color={`#A6A6A6`}
                  />
                )}
              </IconButton>
            }
            rightIconMarginLeft="6%"
          />

          <RegisterButton onPress={() => handleRegister()}>
            <RegisterButtonText>Cadastrar</RegisterButtonText>
          </RegisterButton>
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
      register,
    },
    dispatch,
  );

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
