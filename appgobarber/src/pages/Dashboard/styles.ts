import { FlatList } from 'react-native'
import { RectButton } from 'react-native-gesture-handler'
import styled from 'styled-components/native'
import colors from '../../styles/colors'

import { IProvider } from './index'

export const Container = styled.View`
  flex: 1;
`

export const Header = styled.View`
  padding: 24px;
  background-color: ${colors.header_background};

  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`

export const HeaderTitle = styled.Text`
  color: ${colors.white};
  font-size: 20px;
  font-family: 'RobotoSlab-Regular';
  line-height: 28px;
`

export const Username = styled.Text`
  color: ${colors.orange};
  font-family: 'RobotoSlab-Medium';
`

export const ProfileButton = styled.TouchableOpacity``

export const UserAvatar = styled.Image`
  width: 56px;
  height: 56px;
  border-radius: 28px;
`

export const ProvidersList = styled(FlatList as new () => FlatList<IProvider>)`
  padding: 32px 24px 16px;
`
export const ProvidersListTitle = styled.Text`
  font-size: 24px;
  margin-bottom: 24px;
  color: ${colors.white};
  font-family: 'RobotoSlab-Medium';
`

export const ProviderContainer = styled(RectButton)`
  flex-direction: row;
  align-items: center;
  background: ${colors.provider_background};
  padding: 20px;
  border-radius: 10px;
  margin-bottom: 16px;
`

export const ProviderAvatar = styled.Image`
  width: 72px;
  height: 72px;
  border-radius: 36px;
`

export const ProviderInfo = styled.View`
  flex: 1;
  margin-left: 20px;
`

export const ProviderName = styled.Text`
  font-family: 'RobotoSlab-Medium';
  font-size: 18px;
  color: ${colors.white};
`

export const ProviderMeta = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: 8px;
`

export const ProviderMetaText = styled.Text`
  margin-left: 8px;
  color: ${colors.gray};
`
