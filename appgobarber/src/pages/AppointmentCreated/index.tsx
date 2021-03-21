import React, { useCallback, useMemo } from 'react'
import { useNavigation, useRoute } from '@react-navigation/core'
import { StatusBar } from 'react-native'
import Icon from 'react-native-vector-icons/Feather'
import { format } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'

import colors from '../../styles/colors'

import { Container, Title, Description, OkButton, OkButtonText } from './styles'

interface IRouteParams {
  date: number
}

const AppointmentCreated: React.FC = () => {
  const { reset } = useNavigation()
  const { params } = useRoute()

  const routeParams = params as IRouteParams

  const handleOkPressed = useCallback(() => {
    reset({
      routes: [
        {
          name: 'Dashboard'
        }
      ],
      index: 0
    })
  }, [reset])

  const formattedDate = useMemo(() => {
    return format(
      routeParams.date,
      "EEEE', dia' dd 'de' MMMM 'de' yyyy 'às' HH:mm'h'",
      {
        locale: ptBR
      }
    )
  }, [routeParams.date])

  return (
    <>
      <StatusBar backgroundColor={colors.gray_dark} />
      <Container>
        <Icon name="check" size={80} color={colors.green} />

        <Title>Agendamento concluído</Title>
        <Description>{formattedDate}</Description>

        <OkButton onPress={handleOkPressed}>
          <OkButtonText>Ok</OkButtonText>
        </OkButton>
      </Container>
    </>
  )
}

export default AppointmentCreated
