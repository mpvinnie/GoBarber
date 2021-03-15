import styled, { css } from 'styled-components/native'
import FeatherIcon from 'react-native-vector-icons/Feather'

import colors from '../../styles/colors'

interface IContainerProps {
  isFocused: boolean
  isErrored: boolean
}

export const Container = styled.View<IContainerProps>`
  width: 100%;
  height: 60px;
  padding: 0 16px;
  background: ${colors.black};
  border-radius: 10px;
  margin-bottom: 8px;
  border-width: 2px;
  border-color: ${colors.black};

  flex-direction: row;
  align-items: center;

  ${props =>
    props.isErrored &&
    css`
      border-color: ${colors.error};
    `}

  ${props =>
    props.isFocused &&
    css`
      border-color: ${colors.orange};
    `}
`

export const TextInput = styled.TextInput`
  flex: 1;
  color: ${colors.input_text};
  font-size: 16px;
  font-family: 'RobotoSlab-Regular';
`

export const Icon = styled(FeatherIcon)`
  margin-right: 16px;
`
