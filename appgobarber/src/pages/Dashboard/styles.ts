import { RectButton } from 'react-native-gesture-handler'
import styled from 'styled-components/native'
import colors from '../../styles/colors'

export const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`

export const SignOutButton = styled(RectButton)`
  width: 200px;
  height: 60px;
  background: ${colors.orange};
  align-items: center;
  justify-content: center;
  border-radius: 10px;
`

export const WelcomeMessage = styled.Text`
  font-size: 18px;
  color: ${colors.white};
  font-family: 'RobotoSlab-Medium';
  margin-bottom: 20px;
`

export const SignOutButtonText = styled.Text`
  font-size: 18px;
  color: ${colors.black};
  font-family: 'RobotoSlab-Medium';
`
