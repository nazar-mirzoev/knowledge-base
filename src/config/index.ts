import { config } from 'dotenv'

import { getLoggerConfig } from './logger'
import { getAppConfig } from './app'
import { getDbConfig } from './db'
import { getAuthConfig } from './auth'
import { getDefaultUserConfig } from './defaultUser'

config()

export const loggerConfig = getLoggerConfig(process.env)
export const appConfig = getAppConfig(process.env)
export const dbConfig = getDbConfig(process.env)
export const authConfig = getAuthConfig(process.env)
export const defaultUserConfig = getDefaultUserConfig(process.env)
