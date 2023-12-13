import { Router } from 'express'

import controller from '../controllers/articles'
import createArticleValidation from '../validators/articles/create'
import updateArticleValidation from '../validators/articles/update'

const router = Router()

router.post('/', createArticleValidation, controller.create)

router.delete('/:id', controller.remove)

router.patch('/:id', updateArticleValidation, controller.update)

router.get('/', controller.list)

router.get('/:id', controller.get)

export default router
