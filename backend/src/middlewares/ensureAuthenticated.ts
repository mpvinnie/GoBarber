import { NextFunction, Request, Response } from 'express'
import { verify } from 'jsonwebtoken'

import authConfig from '../config/auth'

interface ITokenPayload {
  sub: string
}

export function ensureAutenticated(
  request: Request,
  response: Response,
  next: NextFunction
): void {
  const authHeader = request.headers.authorization

  if (!authHeader) {
    throw new Error('JWT token is missing')
  }

  const [, token] = authHeader.split(' ')

  try {
    const decoded = verify(token, authConfig.jwt.secret) as ITokenPayload

    const { sub } = decoded

    request.user = {
      id: sub
    }

    console.log(decoded)

    return next()
  } catch {
    throw new Error('Invalid JWT token')
  }
}
