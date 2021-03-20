import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState
} from 'react'
import AsyncStorage from '@react-native-community/async-storage'
import api from '../services/api'

interface IUser {
  id: string
  name: string
  email: string
  avatar_url: string
}

interface IAuthState {
  token: string
  user: IUser
}

interface ISignInCredentials {
  email: string
  password: string
}

interface IAuthContext {
  user: IUser
  signIn(credentials: ISignInCredentials): Promise<void>
  signOut(): void
  loading: boolean
}

const AuthContext = createContext<IAuthContext>({} as IAuthContext)

const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<IAuthState>({} as IAuthState)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadStorageData(): Promise<void> {
      const [token, user] = await AsyncStorage.multiGet([
        '@GoBarber:token',
        '@GoBarber:user'
      ])

      if (token[1] && user[1]) {
        api.defaults.headers.authorization = `Bearer ${token[1]}`
        setData({ token: token[1], user: JSON.parse(user[1]) })
      }

      setLoading(false)
    }

    loadStorageData()
  }, [])

  const signIn = useCallback(
    async ({ email, password }: ISignInCredentials) => {
      const response = await api.post('sessions', {
        email,
        password
      })

      const { token, user } = response.data

      await AsyncStorage.multiSet([
        ['@GoBarber:token', token],
        ['@GoBarber:user', JSON.stringify(user)]
      ])

      api.defaults.headers.authorization = `Bearer ${token}`

      setData({ token, user })
    },
    []
  )

  const signOut = useCallback(async () => {
    await AsyncStorage.multiRemove(['@GoBarber:token', '@GoBarber:user'])

    setData({} as IAuthState)
  }, [])

  return (
    <AuthContext.Provider value={{ user: data.user, signIn, signOut, loading }}>
      {children}
    </AuthContext.Provider>
  )
}

function useAuth(): IAuthContext {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error('useAuth must be used within a AuthProvider')
  }

  return context
}

export { AuthProvider, useAuth }
