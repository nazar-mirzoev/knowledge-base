import LoggerServiceProviderWinston from './providers/winston'
import LoggerService from './service'

import { loggerConfig } from '#/config'

const loggerService = new LoggerService(new LoggerServiceProviderWinston(loggerConfig))
export default loggerService
