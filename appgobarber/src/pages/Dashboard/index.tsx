import React, { useCallback, useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import api from '../../services/api'

import { useAuth } from '../../hooks/auth'

import {
  Container,
  Header,
  HeaderTitle,
  Username,
  ProfileButton,
  UserAvatar,
  ProvidersList
} from './styles'

export interface IProvider {
  id: string
  name: string
  avatar_url: string
}

const Dashboard: React.FC = () => {
  const [providers, setProviders] = useState<IProvider[]>([])
  const { user, signOut } = useAuth()
  const { navigate } = useNavigation()

  useEffect(() => {
    api.get('providers').then(response => {
      setProviders(response.data)
    })
  }, [])

  const navigateToProfile = useCallback(() => {
    // navigate('Profile')
    signOut()
  }, [navigate])

  return (
    <Container>
      <Header>
        <HeaderTitle>
          Bem vindo, {'\n'}
          <Username>{user.name}</Username>
        </HeaderTitle>

        <ProfileButton onPress={navigateToProfile}>
          <UserAvatar source={{ uri: user.avatar_url }} />
        </ProfileButton>
      </Header>

      <ProvidersList
        data={providers}
        keyExtractor={provider => provider.id}
        renderItem={({ item }) => <Username>{item.name}</Username>}
      />
    </Container>
  )
}

export default Dashboard
