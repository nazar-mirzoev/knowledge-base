import { Router } from 'express'

import AuthMiddleware from '../middlewares/auth'
import controller from '../controllers/users'

import signInValidation from '../validators/users/signIn'
import refreshTokenValidation from '../validators/users/refresh'
import createUserValidation from '../validators/users/create'

const router = Router()

router.post('/sign-in', signInValidation, controller.signIn)

router.post('/refresh', refreshTokenValidation, controller.refresh)

router.post('/sign-out', AuthMiddleware, controller.signOut)

router.post('/create', AuthMiddleware, createUserValidation, controller.create)

router.delete('/:id', AuthMiddleware, controller.remove)

export default router
