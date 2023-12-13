import AuthService from './service'
import DefaultAuthServiceProvider from './providers/default'

import { authConfig } from '#/config'

const authService = new AuthService(new DefaultAuthServiceProvider(authConfig))

export default authService
