import { cleanEnv, email, str } from 'envalid'

export const getDefaultUserConfig = (env: NodeJS.ProcessEnv) => {
  const envValidated = cleanEnv(env, {
    DEFAULT_USER_EMAIL: email({}),
    DEFAULT_USER_PASSWORD: str({}),
  })

  return {
    email: envValidated.DEFAULT_USER_EMAIL,
    password: envValidated.DEFAULT_USER_PASSWORD,
  }
}
