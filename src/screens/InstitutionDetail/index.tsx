import React, {useState, useEffect} from 'react';
import {ActivityIndicator, Linking, Platform} from 'react-native';
import AntDesgin from 'react-native-vector-icons/AntDesign';
import openMap from 'react-native-open-maps';
import {AddressItem} from '../Home/styles';
import {
  AddressText,
  AddressTitle,
  BackBoxButton,
  BackIconBox,
  BackText,
  Container,
  ContentBox,
  ImageBox,
  InstitutionDescription,
  LogoItem,
  MapsBoxButton,
  MapsIconBox,
  NameInstitutionItem,
  TitleLogoBox,
} from './styles';
import MapsIcon from '../../../assets/icons/maps.svg';
import {useNavigation} from '@react-navigation/native';

function InstitutionDetail(props) {
  const [item, setItem] = useState(props.route.params.item);
  const [address, setAddress] = useState('');
  const navigation = useNavigation();

  useEffect(() => {
    const itemProps = props.route.params.item;
    const addressProps = itemProps.address;
    const addressFormated =
      addressProps.street +
      ', ' +
      addressProps.number +
      ' - ' +
      addressProps.district +
      ', ' +
      addressProps.city +
      ' - ' +
      addressProps.state +
      ', ' +
      addressProps.cep;
    setAddress(addressFormated);
  }, []);

  async function openMaps() {
    openMap({query: address});
  }

  return (
    <Container>
      {item ? (
        <>
          <BackBoxButton onPress={() => navigation.goBack()}>
            <BackIconBox>
              <AntDesgin name="arrowleft" size={25} color="black" />
            </BackIconBox>
            <BackText>Voltar</BackText>
          </BackBoxButton>
          <ImageBox source={{uri: 'data:image/png;base64,' + item.img}} />
          <AddressItem>
            • {item.city} - {item.uf}
          </AddressItem>
          <ContentBox>
            <TitleLogoBox>
              <LogoItem source={{uri: 'data:image/png;base64,' + item.logo}} />
              <NameInstitutionItem weight="bold">
                {item.name}
              </NameInstitutionItem>
            </TitleLogoBox>
            <InstitutionDescription>{item.desc}</InstitutionDescription>
            <AddressTitle>Endereço</AddressTitle>
            <MapsBoxButton onPress={() => openMaps()}>
              <MapsIconBox>
                <MapsIcon width={20} height={20} />
              </MapsIconBox>
              <AddressText>{address}</AddressText>
            </MapsBoxButton>
          </ContentBox>
        </>
      ) : (
        <ActivityIndicator />
      )}
    </Container>
  );
}

export default InstitutionDetail;
