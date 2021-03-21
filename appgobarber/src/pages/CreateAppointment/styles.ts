import styled from 'styled-components/native'
import colors from '../../styles/colors'
import { FlatList } from 'react-native'
import { IProvider } from '.'
import { RectButton } from 'react-native-gesture-handler'
import fonts from '../../styles/fonts'

interface IProviderContainerProps {
  selected: boolean
}

interface IProviderNameProps {
  selected: boolean
}

interface IHourProps {
  available: boolean
  selected: boolean
}

interface IHourTextProps {
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
  font-family: ${fonts.roboto500};
  font-size: 20px;
  margin-left: 16px;
`

export const UserAvatar = styled.Image`
  width: 56px;
  height: 56px;
  border-radius: 28px;
  margin-left: auto;
`

export const Content = styled.ScrollView``

export const ProvidersListContainer = styled.View`
  height: 112px;
`

export const ProvidersList = styled(
  FlatList as new () => FlatList<IProvider>
).attrs({
  contentContainerStyle: { paddingRight: 32 }
})`
  padding: 32px 24px;
`

export const ProviderContainer = styled(RectButton)<IProviderContainerProps>`
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
  font-family: ${fonts.roboto500};
  color: ${props => (props.selected ? colors.black : colors.white)};
`

export const Calendar = styled.View``

export const Title = styled.Text`
  font-family: ${fonts.roboto500};
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
  font-family: ${fonts.roboto500};
  font-size: 16px;
  color: ${colors.black};
`

export const Schedule = styled.View`
  padding: 24px 0 16px;
`

export const Section = styled.View`
  margin-bottom: 24px;
`

export const SectionTitle = styled.Text`
  font-size: 18px;
  color: ${colors.gray};
  font-family: ${fonts.roboto400};
  margin: 0 24px 12px;
`

export const SectionContent = styled.ScrollView.attrs({
  contentContainerStyle: { paddingHorizontal: 24 },
  horizontal: true,
  showsHorizontalScrollIndicator: false
})``

export const Hour = styled(RectButton)<IHourProps>`
  padding: 12px;
  background: ${props =>
    props.selected ? colors.orange : colors.provider_background};
  border-radius: 10px;
  margin-right: 8px;

  opacity: ${props => (props.available ? 1 : 0.3)};
`

export const HourText = styled.Text<IHourTextProps>`
  color: ${props => (props.selected ? colors.black : colors.white)};
  font-family: ${fonts.roboto400};
  font-size: 16px;
`

export const CreateAppointmentButton = styled(RectButton)`
  height: 50px;
  background: ${colors.orange};
  border-radius: 10px;
  align-items: center;
  justify-content: center;
  margin: 0 24px 24px;
`

export const CreateAppointmentButtonText = styled.Text`
  font-family: ${fonts.roboto500};
  font-size: 18px;
  color: ${colors.black};
`
