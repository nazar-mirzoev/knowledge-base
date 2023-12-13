import { check } from 'express-validator'
import ValidationMiddleware from '../../middlewares/validation'

const createUserValidation = ValidationMiddleware.validate([
  check('email').notEmpty().withMessage('Field required').isEmail().withMessage('Invalid email address'),
  check('password').notEmpty().withMessage('Field required').isString().withMessage('Invalid password'),
])

export default createUserValidation
