import { Request, Response } from 'express'

import logger from '#/services/logger'
import UserActions from '#/actions/users'
import UserAdapter from '../../adapters/user'

import { HTTPStatus } from '#/http/types'

export default async (req: Request<{ id: string }>, res: Response) => {
  try {
    const {
      params: { id },
    } = req
    const user = await UserActions.remove(id)

    const adapted = UserAdapter.toJson(user)

    res.json(adapted)
  } catch (error) {
    logger.error(error as Error)
    return res.status(HTTPStatus.BadRequest).json({ code: HTTPStatus.BadRequest, message: 'Something went wrong' })
  }
}
