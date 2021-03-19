import React, { ButtonHTMLAttributes } from 'react'

import { Container } from './styles'

type IButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  loading?: boolean
}

const Button: React.FC<IButtonProps> = ({ children, loading, ...rest }) => {
  return (
    <Container disabled={loading} type="button" {...rest}>
      {loading ? 'Carregando...' : children}
    </Container>
  )
}

export default Button
