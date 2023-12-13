import { check } from 'express-validator'
import ValidationMiddleware from '../../middlewares/validation'

const refreshTokenValidation = ValidationMiddleware.validate([
  check('refreshToken').notEmpty().withMessage('Field required'),
  check('userId').notEmpty().withMessage('Field required').isMongoId().withMessage('Field should be mongo id'),
])

export default refreshTokenValidation
