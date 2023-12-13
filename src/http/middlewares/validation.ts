import { ValidationChain, validationResult } from 'express-validator'
import { HTTPStatus } from '../types'
import { NextFunction, Request, Response } from 'express'

class ValidationMiddleware {
  static validate(validationChain: ValidationChain[]) {
    return [
      ...validationChain,
      (req: Request, res: Response, next: NextFunction) => {
        const errors = validationResult(req)

        if (!errors.isEmpty()) {
          const code = HTTPStatus.BadRequest
          return res.status(code).json({
            message: 'Invalid request',
            details: errors.array(),
          })
        }

        return next()
      },
    ]
  }
}

export default ValidationMiddleware
