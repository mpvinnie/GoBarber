import styled from 'styled-components/native'
import colors from '../../styles/colors'

export const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding: 0 30px 180px;
`

export const Title = styled.Text`
  font-size: 24px;
  color: ${colors.white};
  font-family: 'RobotoSlab-Medium';
  margin: 64px 0 24px;
`

export const BackToSignIn = styled.TouchableOpacity`
  position: absolute;
  left: 0;
  bottom: 0;
  right: 0;
  background: ${colors.gray_dark};
  border-top-width: 1px;
  border-color: ${colors.black};
  padding: 16px 0;

  justify-content: center;
  align-items: center;
  flex-direction: row;
`

export const BackToSignInText = styled.Text`
  color: ${colors.white};
  font-size: 18px;
  font-family: 'RobotoSlab-Regular';
  margin-left: 16px;
`
