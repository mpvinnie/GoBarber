import styled from 'styled-components/native'
import { RectButton } from 'react-native-gesture-handler'
import colors from '../../styles/colors'
import fonts from '../../styles/fonts'

export const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 0 24px;
`

export const Title = styled.Text`
  font-size: 32px;
  color: ${colors.white};
  font-family: ${fonts.roboto500};
  margin-top: 48px;
  text-align: center;
`

export const Description = styled.Text`
  font-family: ${fonts.roboto400};
  font-size: 18px;
  color: ${colors.gray};
  margin-top: 16px;
`

export const OkButton = styled(RectButton)`
  padding: 12px 24px;
  background: ${colors.orange};
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  margin-top: 24px;
`

export const OkButtonText = styled.Text`
  font-family: ${fonts.roboto500};
  color: ${colors.gray_dark};
  font-size: 18px;
`
