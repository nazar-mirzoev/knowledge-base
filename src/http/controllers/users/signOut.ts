import { Request, Response } from 'express'

import UserActions from '#/actions/users'
import logger from '#/services/logger'

import { HTTPStatus } from '../../types'

export default async (req: Request, res: Response) => {
  try {
    const user = req.user

    await UserActions.signOut(user)

    res.json({ success: true })
  } catch (error) {
    logger.error(error as Error)
    return res.status(HTTPStatus.Unauthorized).json({ code: HTTPStatus.Unauthorized, message: 'Unauthorized' })
  }
}
