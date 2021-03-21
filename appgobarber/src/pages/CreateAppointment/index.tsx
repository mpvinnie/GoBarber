import React, { useCallback, useEffect, useState } from 'react'
import { Platform } from 'react-native'
import { useNavigation, useRoute } from '@react-navigation/core'
import Icon from 'react-native-vector-icons/Feather'
import DateTimePicker from '@react-native-community/datetimepicker'

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
  ProviderName,
  Calendar,
  CalendarTitle,
  OpenDatePickerButton,
  OpenDatePickerButtonText
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
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [selectedProvider, setSelectedProvider] = useState(
    routeParams.providerId
  )
  const [showDatePicker, setShowDatePicker] = useState(false)

  useEffect(() => {
    api.get('/providers').then(response => setProviders(response.data))
  }, [])

  const handleSelectProvider = useCallback((providerId: string) => {
    setSelectedProvider(providerId)
  }, [])

  const handleToggleDatePicker = useCallback(() => {
    setShowDatePicker(state => !state)
  }, [])

  const handleDateChanged = useCallback(
    (event: any, date: Date | undefined) => {
      if (Platform.OS === 'android') {
        setShowDatePicker(false)
      }

      if (date) {
        setSelectedDate(date)
      }
    },
    []
  )

  return (
    <Container>
      <Header>
        <BackButton onPress={() => goBack()}>
          <Icon name="chevron-left" size={24} color={colors.gray} />
        </BackButton>

        <HeaderTitle>Cabeleireiros</HeaderTitle>

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

      <Calendar>
        <CalendarTitle>Escolha a data</CalendarTitle>

        <OpenDatePickerButton onPress={handleToggleDatePicker}>
          <OpenDatePickerButtonText>
            Selecionar outra data
          </OpenDatePickerButtonText>
        </OpenDatePickerButton>

        {showDatePicker && (
          <DateTimePicker
            {...(Platform.OS === 'ios' && { textColor: colors.white })}
            mode="date"
            onChange={handleDateChanged}
            display={Platform.OS === 'android' ? 'calendar' : 'spinner'}
            value={selectedDate}
          />
        )}
      </Calendar>
    </Container>
  )
}

export default CreateAppointment
