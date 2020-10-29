import { RectButton } from 'react-native-gesture-handler'
import styled from 'styled-components/native'

export const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding: 0 30px 150px;
`

export const Title = styled.Text`
  font-size: 24px;
  color: #f4ede8;
  margin: 64px 0 24px;
`

export const BackToSignIn = styled(RectButton)`
  position: absolute;
  left: 0;
  bottom: 0;
  right: 0;
  background: #312e38;
  border-top-width: 1px;
  border-color: #232129;
  padding: 16px 0;

  justify-content: center;
  align-items: center;
  flex-direction: row;
`

export const BackToSignInText = styled.Text`
  color: #fff;
  font-size: 18px;
  font-family: 'Roboto-Light';
  margin-left: 16px;
`