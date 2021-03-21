import styled from 'styled-components/native'
import colors from '../../styles/colors'

export const Container = styled.View`
  flex: 1;
  justify-content: center;
  padding: 150px 30px 180px;
`

export const BackButton = styled.TouchableOpacity`
  margin-top: 24px;
`

export const UserAvatarButton = styled.TouchableOpacity``

export const UserAvatar = styled.Image`
  width: 186px;
  height: 186px;
  border-radius: 98px;
  align-self: center;
`

export const Title = styled.Text`
  font-size: 20px;
  color: ${colors.white};
  font-family: 'RobotoSlab-Medium';
  margin: 24px 0;
`
