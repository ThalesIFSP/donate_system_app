import React, {useEffect, useState} from 'react';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {SearchInput} from '../../components/SearchInput';
import {
  Container,
  HeaderTextBox,
  HiText,
  NameText,
  BellIconBox,
  CountBox,
  ItemCountBox,
  ItemCountText,
  CountText,
  ImageItem,
  AddressItem,
  LogoItem,
  TitleItemBox,
  NameInstitutionItem,
  HeaderBox,
  ItemBoxButton,
} from './styles';
import HandHeart from '../../../assets/icons/hand-heart.svg';
import {Dimensions, FlatList} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {getAllCharities, getCharityNumber} from '../../actions/Charity';
import {getDonationNumber} from '../../actions/Solicitation';
import {getUser} from '../../routes';

function Home(props) {
  const [charities, setCharities] = useState([]);
  const [numberCharitys, setNumberCharitys] = useState(0);
  const [getAllFlag, setGetAllFlag] = useState(false);
  const [donationNumber, setDonationNumber] = useState(0);
  const [username, setUsername] = useState('');

  const navigation = useNavigation();

  useEffect(() => {
    async function getCharities() {
      const {getAllCharities, getCharityNumber, getDonationNumber} = props;
      await getAllCharities();
      await getDonationNumber();
      await getCharityNumber();
      const user = await getUser();
      setUsername(user?.name);
      setGetAllFlag(true);
    }

    getCharities();
  }, []);

  useEffect(() => {
    if (getAllFlag) {
      const {charityData, getAllSuccess, getNumberSuccess, numberCharity} =
        props.charity;
      const {getDonationNumberSuccess, numberSolicitation} = props.solicitation;

      if (getAllSuccess) {
        setCharities(charityData.content);
      }
      if (getNumberSuccess) {
        setNumberCharitys(numberCharity);
      }
      if (getDonationNumberSuccess) {
        setDonationNumber(numberSolicitation);
      }
    }
  }, [getAllFlag]);

  async function onItemPress(item: any) {
    navigation.navigate('InstitutionDetail', {item});
  }

  function renderItem(item: any, index: number) {
    return (
      <ItemBoxButton
        key={index}
        last={index === charities.length - 1}
        onPress={() => onItemPress(item)}>
        <>
          <ImageItem
            source={{uri: 'data:image/png;base64,' + item.img}}
            resizeMode={'cover'}
          />
          <AddressItem>
            • {item.address.city} - {item.address.state}
          </AddressItem>
          <TitleItemBox>
            <LogoItem source={{uri: 'data:image/png;base64,' + item.logo}} />
            <NameInstitutionItem weight="bold">{item.name}</NameInstitutionItem>
          </TitleItemBox>
        </>
      </ItemBoxButton>
    );
  }

  return (
    <Container>
      <HeaderBox>
        <>
          <HeaderTextBox>
            <HiText weight={'bold'}>Olá!</HiText>
            <NameText>{username}</NameText>
          </HeaderTextBox>
          <BellIconBox>
            <FontAwesome5 name="bell" size={25} color={'black'} />
          </BellIconBox>
        </>
      </HeaderBox>
      <SearchInput />

      <CountBox>
        <ItemCountBox>
          <AntDesign name="hearto" size={30} color={'rgba(2, 2, 2, 0.65)'} />
          <ItemCountText>Instituições</ItemCountText>
          <CountText>{numberCharitys}</CountText>
        </ItemCountBox>

        <ItemCountBox>
          <HandHeart width={30} height={30} color={'rgba(2, 2, 2, 0.65)'} />
          <ItemCountText>Itens doados</ItemCountText>
          <CountText>{donationNumber}</CountText>
        </ItemCountBox>
      </CountBox>

      <FlatList
        data={charities}
        renderItem={({item, index}) => renderItem(item, index)}
        showsVerticalScrollIndicator={false}
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
      getAllCharities,
      getCharityNumber,
      getDonationNumber,
    },
    dispatch,
  );

export default connect(mapStateToProps, mapDispatchToProps)(Home);
