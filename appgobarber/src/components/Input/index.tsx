import React from 'react'
import { TextInputProps } from 'react-native'

import colors from '../../styles/colors'

import { Container, TextInput, Icon } from './styles'

interface IInputProps extends TextInputProps {
  name: string
  icon: string
}

const Input: React.FC<IInputProps> = ({ name, icon, ...rest }) => {
  return (
    <Container>
      <Icon name={icon} size={20} color={colors.input_placeholder} />
      <TextInput
        keyboardAppearance="dark"
        placeholderTextColor={colors.input_placeholder}
        {...rest}
      />
    </Container>
  )
}

export default Input
