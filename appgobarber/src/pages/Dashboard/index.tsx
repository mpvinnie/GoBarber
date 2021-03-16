import React from 'react'

import {
  Container,
  WelcomeMessage,
  SignOutButton,
  SignOutButtonText
} from './styles'

import { useAuth } from '../../hooks/auth'

const Dashboard: React.FC = () => {
  const { signOut, user } = useAuth()

  return (
    <Container>
      <WelcomeMessage>Bem vindo {user.name}</WelcomeMessage>
      <SignOutButton
        onPress={() => {
          signOut()
        }}
      >
        <SignOutButtonText>Sair</SignOutButtonText>
      </SignOutButton>
    </Container>
  )
}

export default Dashboard
