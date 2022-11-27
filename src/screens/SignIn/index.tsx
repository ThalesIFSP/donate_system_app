import React, {useEffect, useState} from 'react';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useNavigation} from '@react-navigation/native';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import {
  Container,
  Form,
  ForgotPassButton,
  ForgotPassText,
  LoginButton,
  LoginButtonText,
  OtherLoginBox,
  OtherLoginLine,
  OtherLoginText,
  IconButton,
} from './styles';
import {Input} from '../../components/Input';
import {login} from '../../actions/Auth';
import {setUser} from '../../routes';

function SignIn(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passVisible, setPassVisible] = useState(false);
  const [loginFlag, setLoginFlag] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    async function handleNavigate(user) {
      await setUser(user);
      navigation.navigate('Main');
    }

    if (loginFlag) {
      const {loginSuccess, userData, loginError, errorMessage} = props.auth;
      if (loginSuccess) {
        handleNavigate(userData);
      }
    }
    setLoginFlag(false);
  }, [loginFlag]);

  async function handleLogin() {
    const {login} = props;
    await login(email, password);
    setLoginFlag(true);
  }

  return (
    <Container>
      <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
        <Form>
          <Input
            leftIcon={<Fontisto name={'email'} size={24} color={`#A6A6A6`} />}
            placeholder={'Email'}
            keyboardType={`email-address`}
            autoCapitalize={'none'}
            value={email}
            onChangeText={value => setEmail(value)}
          />

          <Input
            leftIcon={<Feather name={'lock'} size={24} color={`#A6A6A6`} />}
            placeholder={'Senha'}
            secureTextEntry={!passVisible}
            autoCapitalize={'none'}
            value={password}
            onChangeText={value => setPassword(value)}
            rightIcon={
              <IconButton onPress={() => setPassVisible(!passVisible)}>
                {passVisible ? (
                  <Ionicons
                    name={'eye-off-outline'}
                    size={24}
                    color={`#A6A6A6`}
                  />
                ) : (
                  <Ionicons name={'eye-outline'} size={24} color={`#A6A6A6`} />
                )}
              </IconButton>
            }
          />

          <ForgotPassButton>
            <ForgotPassText>Esqueceu a senha?</ForgotPassText>
          </ForgotPassButton>

          <LoginButton onPress={() => handleLogin()}>
            <LoginButtonText>Entrar</LoginButtonText>
          </LoginButton>

          <OtherLoginBox>
            <OtherLoginLine />
            <OtherLoginText>Ou faça login usando</OtherLoginText>
            <OtherLoginLine />
          </OtherLoginBox>
          {/**Já instalei a dependência, precisa criar a conta Firebase e etc: https://github.com/react-native-google-signin/google-signin/blob/master/docs/android-guide.md */}
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
      login,
    },
    dispatch,
  );

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
