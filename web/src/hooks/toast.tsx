import React, { createContext, useCallback, useContext, useState } from 'react'
import { v4 as uuid } from 'uuid'

import ToastContainer from '../components/ToastContainer'

interface IToastContext {
  addToast(message: Omit<IToastMessage, 'id'>): void
  removeToast(id: string): void
}

export interface IToastMessage {
  id: string
  type?: 'success' | 'error' | 'info'
  title: string
  description?: string
}

const ToastContext = createContext<IToastContext>({} as IToastContext)

const ToastProvider: React.FC = ({ children }) => {
  const [messages, setMessages] = useState<IToastMessage[]>([])

  const addToast = useCallback(
    ({ title, type, description }: Omit<IToastMessage, 'id'>) => {
      const id = uuid()

      const toast = {
        id,
        type,
        title,
        description
      }

      setMessages((state) => [...state, toast])
    },
    []
  )

  const removeToast = useCallback((id: string) => {
    setMessages((state) => state.filter((message) => message.id !== id))
  }, [])

  return (
    <ToastContext.Provider value={{ addToast, removeToast }}>
      {children}
      <ToastContainer messages={messages} />
    </ToastContext.Provider>
  )
}

function useToast(): IToastContext {
  const context = useContext(ToastContext)

  if (!context) {
    throw new Error('useToast must be used within a ToastProvider')
  }

  return context
}

export { ToastProvider, useToast }
