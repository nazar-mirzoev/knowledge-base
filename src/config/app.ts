import { cleanEnv, str, num } from 'envalid'

export const getAppConfig = (env: NodeJS.ProcessEnv) => {
  const envValidated = cleanEnv(env, {
    NODE_ENV: str({ choices: ['development', 'production'] }),
    APP_PORT: num({ default: 3000 }),
  })

  return {
    isDev: envValidated.isDev,
    port: envValidated.APP_PORT,
  }
}
