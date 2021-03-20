import React from 'react'
import { useNavigation, useRoute } from '@react-navigation/core'
import Icon from 'react-native-vector-icons/Feather'

import colors from '../../styles/colors'
import { useAuth } from '../../hooks/auth'

import {
  Container,
  Header,
  BackButton,
  HeaderTitle,
  UserAvatar
} from './styles'

interface IRouteParams {
  providerID: string
}

const CreateAppointment: React.FC = () => {
  const { user } = useAuth()
  const { goBack } = useNavigation()

  const route = useRoute()
  const { providerID } = route.params as IRouteParams

  return (
    <Container>
      <Header>
        <BackButton onPress={() => goBack()}>
          <Icon name="chevron-left" size={24} color={colors.gray} />
        </BackButton>

        <HeaderTitle>Cabeleileiros</HeaderTitle>

        <UserAvatar source={{ uri: user.avatar_url }} />
      </Header>
    </Container>
  )
}

export default CreateAppointment
