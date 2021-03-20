import styled from 'styled-components/native'
import colors from '../../styles/colors'

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
