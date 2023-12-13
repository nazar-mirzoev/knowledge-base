import { IRegistrationCredentials } from '#/models/repositories/auth'
import { IAuthServiceProvider } from './types'

class AuthService {
  #provider: IAuthServiceProvider

  constructor(provider: IAuthServiceProvider) {
    this.#provider = provider
  }

  public async register(credentials: IRegistrationCredentials) {
    return this.#provider.register(credentials)
  }

  public async signIn(email: string, password: string) {
    return this.#provider.signIn(email, password)
  }

  public async checkIsAccessTokenValid(accessToken: string, login: string) {
    return this.#provider.checkIsAccessTokenValid(accessToken, login)
  }

  public generateNewTokens(refreshToken: string, login: string) {
    return this.#provider.generateNewTokens(refreshToken, login)
  }

  public async signOut(login: string) {
    return this.#provider.signOut(login)
  }

  public parseToken(token: string) {
    return this.#provider.parseToken(token)
  }

  public isExpirationDateValid(expiration: number) {
    return this.#provider.isExpirationDateValid(expiration)
  }

  public remove(login: string) {
    return this.#provider.remove(login)
  }
}

export default AuthService
