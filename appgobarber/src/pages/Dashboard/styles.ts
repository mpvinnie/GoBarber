import styled from 'styled-components/native'
import { FlatList } from 'react-native'
import { IProvider } from '.'

export const Container = styled.View`
  flex: 1;
`

export const Header = styled.View`
  padding: 24px;
  background: #26262e;

  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`

export const HeaderTitle = styled.Text`
  color: #f4ede8;
  font-size: 24px;
  font-family: 'Roboto-Light';
  line-height: 28px;
`

export const Username = styled.Text`
  color: #ff9000;
  font-family: 'Roboto-Medium';
`

export const ProfileButton = styled.TouchableOpacity``

export const UserAvatar = styled.Image`
  width: 56px;
  height: 56px;
  border-radius: 28px;
`

export const ProvidersList = styled(FlatList as new () => FlatList<IProvider>)``
