import { Request, Response } from 'express'

import UserActions from '#/actions/users'

import { HTTPStatus } from '#/http/types'
import logger from '#/services/logger'

interface IRefreshRequestBody {
  refreshToken: string
  userId: string
}

export default async (req: Request<unknown, unknown, IRefreshRequestBody>, res: Response) => {
  try {
    const { refreshToken, userId } = req.body

    const tokens = await UserActions.refreshTokens(refreshToken, userId)

    return res.json(tokens)
  } catch (error) {
    logger.error(error as Error)
    return res.status(HTTPStatus.Unauthorized).json({ code: HTTPStatus.Unauthorized, message: 'Unauthorized' })
  }
}
