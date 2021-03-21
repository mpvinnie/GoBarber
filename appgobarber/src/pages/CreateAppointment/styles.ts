import styled from 'styled-components/native'
import colors from '../../styles/colors'
import { FlatList } from 'react-native'
import { IProvider } from '.'
import { RectButton } from 'react-native-gesture-handler'

interface IProviderContainerProvider {
  selected: boolean
}

interface IProviderNameProps {
  selected: boolean
}

export const Container = styled.View`
  flex: 1;
`

export const Header = styled.View`
  padding: 24px;
  background: ${colors.header_background};

  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`

export const BackButton = styled.TouchableOpacity``

export const HeaderTitle = styled.Text`
  color: ${colors.white};
  font-family: 'RobotSlab-Medium';
  font-size: 20px;
  margin-left: 16px;
`

export const UserAvatar = styled.Image`
  width: 56px;
  height: 56px;
  border-radius: 28px;
  margin-left: auto;
`

export const ProvidersListContainer = styled.View`
  height: 112px;
`

export const ProvidersList = styled(FlatList as new () => FlatList<IProvider>)`
  padding: 32px 24px;
`

export const ProviderContainer = styled(RectButton)<IProviderContainerProvider>`
  background: ${props =>
    props.selected ? colors.orange : colors.provider_background};
  flex-direction: row;
  align-items: center;
  padding: 8px 12px;
  margin-right: 16px;
  border-radius: 10px;
`

export const ProviderAvatar = styled.Image`
  width: 32px;
  height: 32px;
  border-radius: 16px;
`

export const ProviderName = styled.Text<IProviderNameProps>`
  margin-left: 8px;
  font-family: 'RobotoSlab-Medium';
  color: ${props => (props.selected ? colors.black : colors.white)};
`

export const Calendar = styled.View``

export const CalendarTitle = styled.Text`
  font-family: 'RobotoSlab-Medium';
  color: ${colors.white};
  font-size: 24px;
  margin: 0 24px 24px;
`

export const OpenDatePickerButton = styled(RectButton)`
  height: 46px;
  background: ${colors.orange};
  border-radius: 10px;
  align-items: center;
  justify-content: center;
  margin: 0 24px;
`

export const OpenDatePickerButtonText = styled.Text`
  font-family: 'RobotoSlab-Medium';
  font-size: 16px;
  color: ${colors.black};
`
