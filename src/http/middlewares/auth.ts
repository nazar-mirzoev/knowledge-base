import { NextFunction, Request, Response } from 'express'

import authService from '#/services/auth'
import normalizeToken from '#/utils/normalize/token'
import { userRepository } from '#/models/repositories'
import { HTTPStatus, ICurrentUser } from '../types'

class AuthMiddleware {
  public static create() {
    return async (req: Request, res: Response, next: NextFunction) => {
      const token = req.headers.authorization

      const accessToken = normalizeToken(token)

      try {
        if (!accessToken) throw new Error()

        const { email, exp: expirationDate } = authService.parseToken(accessToken)
        const isExpirationDateValid = expirationDate ? authService.isExpirationDateValid(expirationDate) : false
        if (!isExpirationDateValid) throw new Error()

        const isAccessTokenValid = await authService.checkIsAccessTokenValid(accessToken, email)
        if (!isAccessTokenValid) throw new Error()

        const user = await userRepository.getByEmail(email)

        const currentUser: ICurrentUser = {
          _id: user._id,
          email: email,
        }

        req.user = currentUser

        return next()
      } catch (error) {
        // temp solution for sending data to unauthorized users
        if (req.method === 'GET' && req.baseUrl === '/article') {
          return next()
        }

        return res.status(HTTPStatus.Unauthorized).json({ code: HTTPStatus.Unauthorized, message: 'Unauthorized' })
      }
    }
  }
}

export default AuthMiddleware.create()
