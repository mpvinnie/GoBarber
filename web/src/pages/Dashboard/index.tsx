import React, { useState } from 'react'
import { FiClock, FiPower } from 'react-icons/fi'

import logoImg from '../../assets/logo.svg'

import { useAuth } from '../../hooks/auth'

import {
  Container,
  Header,
  HeaderContent,
  Profile,
  Content,
  Schedule,
  Calendar,
  NextAppointment,
  Appointment,
  Section
} from './styles'

const Dashboard: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState(new Date())

  const { user, signOut } = useAuth()

  return (
    <Container>
      <Header>
        <HeaderContent>
          <img src={logoImg} alt="GoBarber" />

          <Profile>
            <img src={user.avatar_url} alt={user.name} />
            <div>
              <span>Bem-vindo</span>
              <strong>{user.name}</strong>
            </div>
          </Profile>

          <button type="button" onClick={signOut}>
            <FiPower />
          </button>
        </HeaderContent>
      </Header>
      <Content>
        <Schedule>
          <h1>Horários agendados</h1>
          <p>
            <span>Hoje</span>
            <span>Dia 19</span>
            <span>Sexta-feira</span>
          </p>

          <NextAppointment>
            <strong>Atendimento a seguir</strong>
            <div>
              <img
                src="http://localhost:3333/files/88653bb51776f6a7e6c0-Eu.jpg"
                alt="Vinicius Malafaia"
              />

              <strong>Vinicius Malafaia</strong>
              <span>
                <FiClock />
                09:00
              </span>
            </div>
          </NextAppointment>

          <Section>
            <strong>Manhã</strong>

            <Appointment>
              <span>
                <FiClock />
                10:00
              </span>

              <div>
                <img
                  src="http://localhost:3333/files/88653bb51776f6a7e6c0-Eu.jpg"
                  alt="Vinicius Malafaia"
                />

                <strong>Vinicius Malafaia</strong>
              </div>
            </Appointment>
          </Section>

          <Section>
            <strong>Tarde</strong>

            <Appointment>
              <span>
                <FiClock />
                14:00
              </span>

              <div>
                <img
                  src="http://localhost:3333/files/88653bb51776f6a7e6c0-Eu.jpg"
                  alt="Vinicius Malafaia"
                />

                <strong>Vinicius Malafaia</strong>
              </div>
            </Appointment>
            <Appointment>
              <span>
                <FiClock />
                16:00
              </span>

              <div>
                <img
                  src="http://localhost:3333/files/88653bb51776f6a7e6c0-Eu.jpg"
                  alt="Vinicius Malafaia"
                />

                <strong>Vinicius Malafaia</strong>
              </div>
            </Appointment>
          </Section>
        </Schedule>
        <Calendar />
      </Content>
    </Container>
  )
}

export default Dashboard
