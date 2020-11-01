import React from 'react'
import { FiPower } from 'react-icons/fi'

import logoImg from '../../assets/logo.svg'
import { useAuth } from '../../hooks/auth'

import { Container, Header, HeaderContent, Profile } from './styles'

const Dashboard: React.FC = () => {
  const { signOut, user } = useAuth()

  return (
    <Container>
      <Header>
        <HeaderContent>
          <img src={logoImg} alt="Go Barber" />

          <Profile>
            <img src={user.avatar_url} alt={user.name} />
            <div>
              <span>Bem-vindo,</span>
              <strong>Vinicius Peres</strong>
            </div>
          </Profile>

          <button type="button" onClick={signOut}>
            <FiPower />
          </button>
        </HeaderContent>
      </Header>
    </Container>
  )
}

export default Dashboard
