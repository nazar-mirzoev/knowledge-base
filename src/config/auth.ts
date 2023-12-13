import { cleanEnv, str } from 'envalid'

export const getAuthConfig = (env: NodeJS.ProcessEnv) => {
  const envValidated = cleanEnv(env, {
    JWT_SECRET: str({}),
    JWT_ACCESS_EXPIRES: str({}),
    JWT_REFRESH_EXPIRES: str({}),
  })

  return {
    jwtSecret: envValidated.JWT_SECRET,
    jwtAccessExpires: envValidated.JWT_ACCESS_EXPIRES,
    jwtRefreshExpires: envValidated.JWT_REFRESH_EXPIRES,
  }
}
