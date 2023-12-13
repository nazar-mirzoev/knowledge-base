import { cleanEnv, str } from 'envalid'

const FILENAME_DEFAULT = '%DATE%.log'

export const getLoggerConfig = (env: NodeJS.ProcessEnv) => {
  const envValidated = cleanEnv(env, {
    LOGGER_FILES_PATH: str({ default: undefined }),
    LOGGER_FILES_MAX_SIZE: str({ default: '256m' }),
    LOGGER_FILES_RETENTION_INTERVAL: str({ default: '28d' }),
  })

  return {
    fileName: FILENAME_DEFAULT,
    filesPath: envValidated.LOGGER_FILES_PATH,
    filesMaxSize: envValidated.LOGGER_FILES_MAX_SIZE,
    filesRetentionInterval: envValidated.LOGGER_FILES_RETENTION_INTERVAL,
  }
}
