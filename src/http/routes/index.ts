import { Handler, Router } from 'express'

import usersRouter from './user'
import articlesRouter from './article'

class ApiRouter {
  #authMiddleware: Handler

  constructor(authMiddleware: Handler) {
    this.#authMiddleware = authMiddleware
  }

  getRouter(): Router {
    const router = Router()

    router.use('/user', usersRouter)

    router.use('/article', this.#authMiddleware, articlesRouter)

    return router
  }
}

export default ApiRouter
