import Router from '#/http/routes'
import setupActions from '#/actions/setup'
import App from './app'
import { appConfig } from './config'
import AuthMiddleware from '#/http/middlewares/auth'

const start = async () => {
  const app = new App(appConfig.port)

  await setupActions.createDefaultUser()

  app.applyRoute('/', new Router(AuthMiddleware).getRouter())

  app.listen()
}

start()
