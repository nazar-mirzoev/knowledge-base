import { Request, Response } from 'express'

import UserActions from '#/actions/users'
import logger from '#/services/logger'
import UserAdapter from '../../adapters/user'

import { HTTPStatus } from '../../types'

interface ISignInRequestBody {
  email: string
  password: string
}

export default async (req: Request<unknown, unknown, ISignInRequestBody>, res: Response) => {
  try {
    const { email, password } = req.body

    const result = await UserActions.signIn(email, password)

    const adapted = UserAdapter.signIn(result)
    res.json(adapted)
  } catch (error) {
    logger.error(error as Error)
    return res.status(HTTPStatus.Unauthorized).json({ code: HTTPStatus.Unauthorized, message: 'Unauthorized' })
  }
}
