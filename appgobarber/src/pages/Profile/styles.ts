import styled from 'styled-components/native'
import colors from '../../styles/colors'

export const Container = styled.View`
  flex: 1;
  justify-content: center;
  padding: 150px 30px 180px;
`

export const Header = styled.View`
  justify-content: space-between;
  flex-direction: row;
`

export const BackButton = styled.TouchableOpacity`
  margin-top: 24px;
  width: 28px;
  height: 28px;
  border-radius: 14px;
  align-items: center;
  justify-content: center;
`

export const LogoutButton = styled.TouchableOpacity`
  margin-top: 24px;
  width: 28px;
  height: 28px;
  border-radius: 14px;
  align-items: center;
  justify-content: center;
`

export const UserAvatarContainer = styled.View`
  width: 186px;
  height: 186px;
  border-radius: 98px;
  align-self: center;
  position: relative;
`

export const UserAvatar = styled.Image`
  width: 186px;
  height: 186px;
  border-radius: 98px;
`

export const OpenCameraButton = styled.TouchableOpacity`
  position: absolute;
  bottom: 0;
  left: 0;
`

export const OpenChooseFileButton = styled.TouchableOpacity`
  position: absolute;
  bottom: 0;
  right: 0;
`

export const Title = styled.Text`
  font-size: 20px;
  color: ${colors.white};
  font-family: 'RobotoSlab-Medium';
  margin: 24px 0;
`
