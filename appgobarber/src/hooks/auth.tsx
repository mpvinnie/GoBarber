import React, {
  createContext,
  useCallback,
  useState,
  useContext,
  useEffect
} from 'react'
import AsyncStorage from '@react-native-community/async-storage'
import api from '../services/api'

interface IAuthState {
  token: string
  user: object
}

interface ISignInCredentials {
  email: string
  password: string
}

interface IAuthContextData {
  user: object
  signIn(credentials: ISignInCredentials): Promise<void>
  signOut(): void
}

const AuthContext = createContext<IAuthContextData>({} as IAuthContextData)

const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<IAuthState>({} as IAuthState)

  useEffect(() => {
    async function loadStoragedData(): Promise<void> {
      const [token, user] = await AsyncStorage.multiGet([
        '@GoBarber:token',
        '@GoBarber:user'
      ])

      if (token[1] && user[1]) {
        setData({ token: token[1], user: JSON.parse(user[1]) })
      }
    }

    loadStoragedData()
  }, [])

  const signIn = useCallback(async ({ email, password }) => {
    const response = await api.post('sessions', {
      email,
      password
    })

    const { token, user } = response.data

    await AsyncStorage.multiSet([
      ['@GoBarber:token', token],
      ['@GoBarber:user', JSON.stringify(user)]
    ])

    setData({ token, user })
  }, [])

  const signOut = useCallback(async () => {
    await AsyncStorage.multiRemove(['@GoBarber:user', '@GoBarber:token'])

    setData({} as IAuthState)
  }, [])

  return (
    <AuthContext.Provider value={{ user: data.user, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}

function useAuth(): IAuthContextData {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }

  return context
}

export { useAuth, AuthProvider }
