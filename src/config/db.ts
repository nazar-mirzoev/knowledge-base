import { cleanEnv, str, url } from 'envalid'

export const getDbConfig = (env: NodeJS.ProcessEnv) => {
  const envValidated = cleanEnv(env, {
    DB_CONNECTION_STRING: url({}),
    DB_NAME: str({}),
  })

  return {
    connectionString: envValidated.DB_CONNECTION_STRING,
    name: envValidated.DB_NAME,
  }
}
