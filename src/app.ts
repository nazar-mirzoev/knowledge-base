import express, { Application, Router } from 'express'

import logger from './services/logger'

export default class App {
  #port: number
  #app: Application

  constructor(port: number) {
    this.#port = port
    this.#app = express()

    this.#app.use(express.json({ limit: '10mb' }))
  }

  applyRoute(path: string, router: Router) {
    this.#app.use(path, router)
  }

  listen() {
    this.#app.listen(this.#port, () => {
      logger.info(`App started on ${this.#port} port`)
    })
  }
}
