import React, { useCallback, useEffect, useState } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import Icon from 'react-native-vector-icons/Feather'
import { useAuth } from '../../hooks/auth'

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
import api from '../../services/api'

interface IRouteParams {
  providerId: string
}

export interface IProvider {
  id: string
  name: string
  avatar_url: string
}

const CreateAppointment: React.FC = () => {
  const [providers, setProviders] = useState<IProvider[]>([])

  const { user } = useAuth()
  const route = useRoute()
  const { goBack } = useNavigation()

  const routeParams = route.params as IRouteParams
  const [selectedProvider, setSelectedProvider] = useState(
    routeParams.providerId
  )

  useEffect(() => {
    api.get('providers').then(response => {
      setProviders(response.data)
    })
  }, [])

  const navigateBack = useCallback(() => {
    goBack()
  }, [goBack])

  const handleSelectProvider = useCallback((providerId: string) => {
    setSelectedProvider(providerId)
  }, [])

  return (
    <Container>
      <Header>
        <BackButton onPress={navigateBack}>
          <Icon name="chevron-left" size={24} color="#959991" />
        </BackButton>

        <HeaderTitle>Cabeleileiros</HeaderTitle>

        <UserAvatar source={{ uri: user.avatar_url }} />
      </Header>

      <ProvidersListContainer>
        <ProvidersList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={providers}
          keyExtractor={provider => provider.id}
          renderItem={({ item: provider }) => (
            <ProviderContainer
              selected={provider.id === selectedProvider}
              onPress={() => handleSelectProvider(provider.id)}
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
