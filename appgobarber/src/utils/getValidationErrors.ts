import { ValidationError } from 'yup'

interface IErrors {
  [key: string]: string
}

export default function getValidationErrors(err: ValidationError): IErrors {
  const validationsErrors: IErrors = {}

  err.inner.forEach(error => {
    if (error.path) {
      validationsErrors[error.path] = error.message
    }
  })

  return validationsErrors
}
