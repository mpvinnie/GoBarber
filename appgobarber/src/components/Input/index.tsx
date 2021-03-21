import React, {
  useEffect,
  useRef,
  useImperativeHandle,
  forwardRef,
  useState,
  useCallback
} from 'react'
import { TextInputProps } from 'react-native'
import { useField } from '@unform/core'

import colors from '../../styles/colors'

import { Container, TextInput, Icon } from './styles'

interface IInputProps extends TextInputProps {
  name: string
  icon: string
  containerStyle?: React.CSSProperties
}

interface IInputValueReference {
  value: string
}

interface IInputRef {
  focus(): void
}

const Input: React.ForwardRefRenderFunction<IInputRef, IInputProps> = (
  { name, icon, containerStyle = {}, ...rest },
  ref
) => {
  const inputElementRef = useRef<any>(null)

  const { registerField, defaultValue = '', fieldName, error } = useField(name)
  const inputValueRef = useRef<IInputValueReference>({ value: defaultValue })

  const [isFocused, setIsFocused] = useState(false)
  const [isFilled, setIsFilled] = useState(false)

  const handleInputFocus = useCallback(() => {
    setIsFocused(true)
  }, [])

  const handleInputBlur = useCallback(() => {
    setIsFocused(false)

    setIsFilled(!!inputValueRef.current.value)
  }, [])

  useImperativeHandle(ref, () => ({
    focus() {
      inputElementRef.current.focus()
    }
  }))

  useEffect(() => {
    registerField<string>({
      name: fieldName,
      ref: inputValueRef.current,
      path: 'value',
      setValue(ref: any, value) {
        inputValueRef.current.value = value
        inputElementRef.current.setNativeProps({ text: value })
      },
      clearValue() {
        inputValueRef.current.value = ''
        inputElementRef.current.clear()
      }
    })
  }, [fieldName, registerField])

  return (
    <Container style={containerStyle} isFocused={isFocused} isErrored={!!error}>
      <Icon
        name={icon}
        size={20}
        color={isFocused || isFilled ? colors.orange : colors.input_placeholder}
      />
      <TextInput
        ref={inputElementRef}
        keyboardAppearance="dark"
        placeholderTextColor={colors.input_placeholder}
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        defaultValue={defaultValue}
        onChangeText={value => {
          inputValueRef.current.value = value
        }}
        {...rest}
      />
    </Container>
  )
}

export default forwardRef(Input)
