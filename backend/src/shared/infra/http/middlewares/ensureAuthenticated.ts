import authConfig from '@config/auth'
import { NextFunction, Request, Response } from 'express'
import { verify } from 'jsonwebtoken'

import { AppError } from '@shared/errors/AppError'

interface ITokenPayload {
  sub: string
}

export function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
): void {
  const authHeader = request.headers.authorization

  if (!authHeader) {
    throw new AppError('JWT token is missing', 401)
  }

  const [, token] = authHeader.split(' ')

  try {
    const decoded = verify(token, authConfig.jwt.secret) as ITokenPayload

    const { sub } = decoded

    request.user = {
      id: sub
    }

    return next()
  } catch {
    throw new AppError('Invalid JWT token', 401)
  }
}
