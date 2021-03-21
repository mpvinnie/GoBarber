import React, { useCallback, useRef, useState } from 'react'
import {
  StatusBar,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TextInput,
  Alert,
  View,
  PermissionsAndroid
} from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { Form } from '@unform/mobile'
import { FormHandles } from '@unform/core'
import * as Yup from 'yup'
import Icon from 'react-native-vector-icons/Feather'
import { launchCamera, launchImageLibrary } from 'react-native-image-picker'

import api from '../../services/api'

import { useAuth } from '../../hooks/auth'
import colors from '../../styles/colors'
import getValidationErrors from '../../utils/getValidationErrors'

import Input from '../../components/Input'
import Button from '../../components/Button'

import {
  Container,
  Header,
  BackButton,
  LogoutButton,
  UserAvatarContainer,
  UserAvatar,
  OpenCameraButton,
  OpenChooseFileButton,
  Title
} from './styles'

interface IProfileFormData {
  name: string
  email: string
  old_password: string
  password: string
  password_confirmation: string
}

const Profile: React.FC = () => {
  const formRef = useRef<FormHandles>(null)
  const { goBack } = useNavigation()

  const { user, updateUser, signOut } = useAuth()

  const emailInputRef = useRef<TextInput>(null)
  const oldPasswordInputRef = useRef<TextInput>(null)
  const passwordInputRef = useRef<TextInput>(null)
  const confirmPasswordInputRef = useRef<TextInput>(null)

  const handleUpdateProfile = useCallback(
    async (data: IProfileFormData) => {
      try {
        formRef.current?.setErrors({})

        const schema = Yup.object().shape({
          name: Yup.string().required('Nome obrigatório'),
          email: Yup.string()
            .required('E-mail obrigatório')
            .email('Digite um e-mail válido'),
          old_password: Yup.string(),
          password: Yup.string().when('old_password', {
            is: (val: string) => !!val.length,
            then: Yup.string().required('Campo obrigatório'),
            otherwise: Yup.string()
          }),
          password_confirmation: Yup.string()
            .when('old_password', {
              is: (val: string) => !!val.length,
              then: Yup.string().required('Campo obrigatório'),
              otherwise: Yup.string()
            })
            .oneOf([Yup.ref('password'), null], 'Confirmação incorreta')
        })

        await schema.validate(data, {
          abortEarly: false
        })

        const {
          name,
          email,
          old_password,
          password,
          password_confirmation
        } = data

        const formData = {
          name,
          email,
          ...(old_password
            ? {
                old_password,
                password,
                password_confirmation
              }
            : {})
        }

        const response = await api.put('profile', formData)

        updateUser(response.data)

        Alert.alert('Perfil atualizado com sucesso!')

        goBack()
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err)

          formRef.current?.setErrors(errors)

          return
        }

        Alert.alert(
          'Erro na atualização do perfil',
          'Ocorreu um erro ao atualizar seu perfil, tente novamente'
        )
      }
    },
    [goBack, updateUser]
  )

  const requestCameraPermission = useCallback(async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
          {
            title: 'Permissão de camera',
            message: 'GoBarber precisa de permissão para acessar a câmera',
            buttonPositive: 'Permitir'
          }
        )
        return granted === PermissionsAndroid.RESULTS.GRANTED
      } catch (err) {
        console.warn(err)
        return false
      }
    }
  }, [])

  const requestExternalWritePermission = useCallback(async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: 'Permissão para salvar',
            message: 'GoBarber precisa de permissão salvar na galeria',
            buttonPositive: 'Permitir'
          }
        )
        return granted === PermissionsAndroid.RESULTS.GRANTED
      } catch (err) {
        console.warn(err)
        Alert.alert('Permissão para salvar', err)
      }
      return false
    } else return true
  }, [])

  const openCamera = useCallback(async () => {
    const isCameraPermitted = await requestCameraPermission()
    const isStoragePermitted = await requestExternalWritePermission()

    if (isCameraPermitted && isStoragePermitted) {
      launchCamera(
        {
          mediaType: 'photo',
          saveToPhotos: true
        },
        response => {
          if (response.didCancel) {
            return
          }

          if (response.errorCode === 'camera_unavailable') {
            Alert.alert('Camera não disponível')
            return
          }

          if (response.errorCode === 'permission') {
            Alert.alert('Permissão negada', 'Você precisa liberar permissão')
            return
          }

          if (response.errorMessage) {
            Alert.alert(response.errorMessage)
            return
          }

          const data = new FormData()

          data.append('avatar', {
            type: 'image/jpeg',
            name: `${user.id}.jpg`,
            uri: response.uri
          })

          api.patch('/users/avatar', data).then(response => {
            updateUser(response.data)
          })
        }
      )
    }
  }, [
    requestCameraPermission,
    requestExternalWritePermission,
    updateUser,
    user.id
  ])

  const chooseImageOnGalery = useCallback(async () => {
    const isCameraPermitted = await requestCameraPermission()
    const isStoragePermitted = await requestExternalWritePermission()

    if (isCameraPermitted && isStoragePermitted) {
      launchImageLibrary(
        {
          mediaType: 'photo'
        },
        response => {
          if (response.didCancel) {
            return
          }

          if (response.errorCode === 'camera_unavailable') {
            Alert.alert('Camera não disponível')
            return
          }

          if (response.errorCode === 'permission') {
            Alert.alert('Permissão negada', 'Você precisa liberar permissão')
            return
          }

          if (response.errorMessage) {
            Alert.alert(response.errorMessage)
            return
          }

          const data = new FormData()

          data.append('avatar', {
            type: 'image/jpeg',
            name: `${user.id}.jpg`,
            uri: response.uri
          })

          api.patch('/users/avatar', data).then(response => {
            updateUser(response.data)
          })
        }
      )
    }
  }, [
    requestCameraPermission,
    requestExternalWritePermission,
    updateUser,
    user.id
  ])

  return (
    <>
      <StatusBar backgroundColor={colors.gray_dark} />
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        enabled
      >
        <ScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{ flex: 1 }}
        >
          <Container>
            <Header>
              <BackButton onPress={goBack}>
                <Icon name="chevron-left" size={24} color={colors.gray} />
              </BackButton>

              <LogoutButton onPress={signOut}>
                <Icon name="power" size={20} color={colors.gray} />
              </LogoutButton>
            </Header>

            <UserAvatarContainer>
              <UserAvatar source={{ uri: user.avatar_url }} />

              <OpenCameraButton onPress={openCamera}>
                <Icon name="camera" size={24} color={colors.gray} />
              </OpenCameraButton>

              <OpenChooseFileButton onPress={chooseImageOnGalery}>
                <Icon name="edit" size={24} color={colors.gray} />
              </OpenChooseFileButton>
            </UserAvatarContainer>

            <View>
              <Title>Meu perfil</Title>
            </View>

            <Form
              initialData={user}
              style={{ width: '100%' }}
              ref={formRef}
              onSubmit={handleUpdateProfile}
            >
              <Input
                autoCapitalize="words"
                name="name"
                icon="user"
                placeholder="Nome"
                returnKeyType="next"
                onSubmitEditing={() => {
                  emailInputRef.current?.focus()
                }}
              />
              <Input
                ref={emailInputRef}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                name="email"
                icon="mail"
                placeholder="E-mail"
                returnKeyType="next"
                onSubmitEditing={() => {
                  oldPasswordInputRef.current?.focus()
                }}
              />
              <Input
                ref={oldPasswordInputRef}
                secureTextEntry
                name="old_password"
                icon="lock"
                placeholder="Senha atual"
                textContentType="newPassword"
                returnKeyType="next"
                containerStyle={{ marginTop: 16 }}
                onSubmitEditing={() => {
                  passwordInputRef.current?.focus()
                }}
              />
              <Input
                ref={passwordInputRef}
                secureTextEntry
                name="password"
                icon="lock"
                placeholder="Nova senha"
                textContentType="newPassword"
                returnKeyType="next"
                onSubmitEditing={() => {
                  confirmPasswordInputRef.current?.focus()
                }}
              />
              <Input
                ref={confirmPasswordInputRef}
                secureTextEntry
                name="password_confirmation"
                icon="lock"
                placeholder="Confirmar senha"
                textContentType="newPassword"
                returnKeyType="send"
                onSubmitEditing={() => {
                  formRef.current?.submitForm()
                }}
              />

              <Button
                onPress={() => {
                  formRef.current?.submitForm()
                }}
              >
                Confirmar mudanças
              </Button>
            </Form>
          </Container>
        </ScrollView>
      </KeyboardAvoidingView>
    </>
  )
}

export default Profile
