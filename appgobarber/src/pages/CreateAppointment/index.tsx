import React, { useCallback, useEffect, useState } from 'react'
import { useNavigation, useRoute } from '@react-navigation/core'
import Icon from 'react-native-vector-icons/Feather'

import colors from '../../styles/colors'
import { useAuth } from '../../hooks/auth'

import api from '../../services/api'

import {
  Container,
  Header,
  BackButton,
  HeaderTitle,
  UserAvatar,
  ProvidersListContainer,
  ProvidersList,
  ProviderContainer,
  ProviderAvatar,
  ProviderName
} from './styles'

interface IRouteParams {
  providerId: string
}

export interface IProvider {
  id: string
  name: string
  avatar_url: string
}

const CreateAppointment: React.FC = () => {
  const { user } = useAuth()
  const { goBack } = useNavigation()
  const route = useRoute()

  const routeParams = route.params as IRouteParams

  const [providers, setProviders] = useState<IProvider[]>([])
  const [selectedProvider, setSelectedProvider] = useState(
    routeParams.providerId
  )

  useEffect(() => {
    api.get('/providers').then(response => setProviders(response.data))
  }, [])

  const handleSelectProvider = useCallback((providerId: string) => {
    setSelectedProvider(providerId)
  }, [])

  return (
    <Container>
      <Header>
        <BackButton onPress={() => goBack()}>
          <Icon name="chevron-left" size={24} color={colors.gray} />
        </BackButton>

        <HeaderTitle>Cabeleileiros</HeaderTitle>

        <UserAvatar source={{ uri: user.avatar_url }} />
      </Header>

      <ProvidersListContainer>
        <ProvidersList
          horizontal
          contentContainerStyle={{ paddingRight: 32 }}
          showsHorizontalScrollIndicator={false}
          data={providers}
          keyExtractor={provider => provider.id}
          renderItem={({ item: provider }) => (
            <ProviderContainer
              onPress={() => handleSelectProvider(provider.id)}
              selected={provider.id === selectedProvider}
            >
              <ProviderAvatar source={{ uri: provider.avatar_url }} />
              <ProviderName selected={provider.id === selectedProvider}>
                {provider.name}
              </ProviderName>
            </ProviderContainer>
          )}
        />
      </ProvidersListContainer>
    </Container>
  )
}

export default CreateAppointment
