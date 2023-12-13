import { Request, Response } from 'express'

import UserActions from '#/actions/users'
import logger from '#/services/logger'
import UserAdapter from '../../adapters/user'

import { HTTPStatus } from '../../types'

interface ICreateUserRequestBody {
  email: string
  password: string
}

export default async (req: Request<unknown, unknown, ICreateUserRequestBody>, res: Response) => {
  try {
    const { email, password } = req.body

    const user = await UserActions.create(email, password)

    const adapted = UserAdapter.toJson(user)
    res.json(adapted)
  } catch (error) {
    logger.error(error as Error)
    return res
      .status(HTTPStatus.InternalServerError)
      .json({ code: HTTPStatus.InternalServerError, message: 'Something went wrong' })
  }
}
