import React, { useCallback, useEffect, useState } from 'react'
import { StatusBar } from 'react-native'
import { useNavigation } from '@react-navigation/core'
import api from '../../services/api'
import Icon from 'react-native-vector-icons/Feather'

import { useAuth } from '../../hooks/auth'
import colors from '../../styles/colors'

import {
  Container,
  Header,
  HeaderTitle,
  Username,
  ProfileButton,
  UserAvatar,
  ProvidersList,
  ProvidersListTitle,
  ProviderContainer,
  ProviderAvatar,
  ProviderInfo,
  ProviderName,
  ProviderMeta,
  ProviderMetaText
} from './styles'

export interface IProvider {
  id: string
  name: string
  avatar_url: string
}

const Dashboard: React.FC = () => {
  const [providers, setProviders] = useState<IProvider[]>([])

  const { user } = useAuth()

  const { navigate } = useNavigation()

  useEffect(() => {
    api.get('providers').then(response => {
      setProviders(response.data)
    })
  }, [])

  const navigateToProfile = useCallback(() => {
    navigate('Profile')
  }, [navigate])

  const navigateToCreateAppointment = useCallback(
    (providerId: string) => {
      navigate('CreateAppointment', { providerId })
    },
    [navigate]
  )

  return (
    <>
      <StatusBar backgroundColor={colors.header_background} />
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
          contentContainerStyle={{ paddingBottom: 32 }}
          keyExtractor={provider => provider.id}
          ListHeaderComponent={
            <ProvidersListTitle>Cabeleileiros</ProvidersListTitle>
          }
          renderItem={({ item: provider }) => (
            <ProviderContainer
              onPress={() => navigateToCreateAppointment(provider.id)}
            >
              <ProviderAvatar source={{ uri: provider.avatar_url }} />

              <ProviderInfo>
                <ProviderName>{provider.name}</ProviderName>

                <ProviderMeta>
                  <Icon name="calendar" size={14} color={colors.orange} />
                  <ProviderMetaText>Segunda à sexta</ProviderMetaText>
                </ProviderMeta>
                <ProviderMeta>
                  <Icon name="clock" size={14} color={colors.orange} />
                  <ProviderMetaText>8h às 18h</ProviderMetaText>
                </ProviderMeta>
              </ProviderInfo>
            </ProviderContainer>
          )}
        />
      </Container>
    </>
  )
}

export default Dashboard
