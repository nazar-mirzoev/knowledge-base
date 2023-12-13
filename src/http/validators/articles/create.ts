import { check } from 'express-validator'
import ValidationMiddleware from '../../middlewares/validation'

const createArticleValidation = ValidationMiddleware.validate([
  check('title').notEmpty().withMessage('Field required').isString(),
  check('content').optional().isString(),
  check('tags').optional().isArray(),
  check('isPublic').optional().isBoolean(),
])

export default createArticleValidation
