import { check } from 'express-validator'
import ValidationMiddleware from '../../middlewares/validation'

const updateArticleValidation = ValidationMiddleware.validate([
  check('title').optional().isString(),
  check('content').optional().isString(),
  check('tags').optional().isArray(),
  check('isPublic').optional().isBoolean(),
])

export default updateArticleValidation
