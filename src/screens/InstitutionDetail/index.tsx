import React, {useState} from 'react';
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

function InstitutionDetail(props) {
  const [item, setItem] = useState(props.route.params.item);
  const [address, setAddress] = useState(
    'R. Tietê, 4860 - Santa Eliza, Votuporanga - SP, 15505-186',
  );

  async function openMaps() {
    openMap({query: address});
  }

  return (
    <Container>
      {item ? (
        <>
          <BackBoxButton>
            <BackIconBox>
              <AntDesgin name="arrowleft" size={25} color="black" />
            </BackIconBox>
            <BackText>Voltar</BackText>
          </BackBoxButton>
          <ImageBox source={{uri: item.image}} />
          <AddressItem>
            • {item.city} - {item.uf}
          </AddressItem>
          <ContentBox>
            <TitleLogoBox>
              <LogoItem source={{uri: item.logo}} />
              <NameInstitutionItem weight="bold">
                {item.name}
              </NameInstitutionItem>
            </TitleLogoBox>
            <InstitutionDescription>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus
              venenatis velit bibendum fermentum condimentum. Fusce ut eleifend
              lacus, ac sollicitudin tellus. Vivamus nunc libero, finibus nec
              aliquam id, accumsan vitae tellus. Pellentesque
            </InstitutionDescription>
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
