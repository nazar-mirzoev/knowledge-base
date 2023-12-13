import { IRegistrationCredentials } from '#/models/repositories/auth'

export interface IJWTAuthConfig {
  jwtSecret: string
  jwtAccessExpires: string | number
  jwtRefreshExpires: string | number
}

export interface IUserTokens {
  accessToken: string
  refreshToken: string
}

export interface IJwtDecoded {
  email: string
  exp: number
}

export interface IAuthServiceProvider {
  register(credentials: IRegistrationCredentials): Promise<void>
  signIn(email: string, password: string): Promise<IUserTokens>
  checkIsAccessTokenValid(accessToken: string, login: string): Promise<boolean>
  generateNewTokens(refreshToken: string, login: string): Promise<IUserTokens>
  signOut(login: string): Promise<void>
  parseToken(token: string): IJwtDecoded
  isExpirationDateValid(expiration: number): boolean
  remove(login: string): Promise<void>
}
