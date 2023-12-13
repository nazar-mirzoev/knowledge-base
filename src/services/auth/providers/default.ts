import bcrypt from 'bcrypt'
import jwt, { TokenExpiredError } from 'jsonwebtoken'

import { authRepository } from '#/models/repositories'
import { AuthException } from '../exceptions'

import { IAuthServiceProvider, IJWTAuthConfig, IJwtDecoded, IUserTokens } from '../types'
import { IRegistrationCredentials } from '#/models/repositories/auth'

class DefaultAuthServiceProvider implements IAuthServiceProvider {
  #config: IJWTAuthConfig

  constructor(config: IJWTAuthConfig) {
    this.#config = config
  }
  private async encryptString(str: string): Promise<string> {
    return bcrypt.hash(str, 10)
  }

  private async validateStringHash(str: string, strEncrypted: string): Promise<boolean> {
    return bcrypt.compare(str, strEncrypted)
  }

  private createTokens(email: string): IUserTokens {
    const { jwtSecret, jwtAccessExpires, jwtRefreshExpires } = this.#config

    const accessToken = jwt.sign({ email }, jwtSecret, { expiresIn: jwtAccessExpires })
    const refreshToken = jwt.sign({ email }, jwtSecret, { expiresIn: jwtRefreshExpires })

    return { accessToken, refreshToken }
  }

  private async validateAccessTokenByIdentifier(token: string, email: string): Promise<boolean> {
    const { accessToken } = await authRepository.getByLogin(email)

    if (!accessToken) {
      return false
    }

    const isValid = token === accessToken

    return isValid
  }

  private async validateRefreshTokenByIdentifier(token: string, email: string): Promise<boolean> {
    const { refreshToken } = await authRepository.getByLogin(email)

    if (!refreshToken) {
      return false
    }

    const isValid = token === refreshToken

    return isValid
  }

  public async register(credentials: IRegistrationCredentials): Promise<void> {
    const hasAuthUser = await authRepository.exists({ login: credentials.login })

    if (hasAuthUser) throw new AuthException('User already exists')

    const encryptedPassword = await this.encryptString(credentials.password)

    credentials.password = encryptedPassword

    await authRepository.create(credentials)
  }

  public async signIn(email: string, password: string): Promise<IUserTokens> {
    const authUser = await authRepository.getByLogin(email)

    const isRightPassword = await this.validateStringHash(password, authUser.password)
    if (!isRightPassword) throw new AuthException('Invalid Credentials')

    const tokens = this.createTokens(authUser.login)

    await authRepository.update(authUser.login, tokens)

    return tokens
  }

  public async checkIsAccessTokenValid(accessToken: string, login: string): Promise<boolean> {
    const isRefreshTokenValid = await this.validateAccessTokenByIdentifier(accessToken, login)

    return isRefreshTokenValid
  }

  public async generateNewTokens(refreshToken: string, login: string): Promise<IUserTokens> {
    const isRefreshTokenValid = await this.validateRefreshTokenByIdentifier(refreshToken, login)

    if (!isRefreshTokenValid) {
      throw new AuthException('Invalid refresh token')
    }

    const tokens = this.createTokens(login)
    await authRepository.update(login, tokens)

    return tokens
  }

  public async signOut(login: string): Promise<void> {
    await authRepository.update(login, { accessToken: undefined, refreshToken: undefined })
  }

  public parseToken(token: string): IJwtDecoded {
    let payload: IJwtDecoded
    try {
      payload = jwt.verify(token, this.#config.jwtSecret) as IJwtDecoded
    } catch (error) {
      if (!(error instanceof TokenExpiredError)) {
        throw new AuthException()
      }
      payload = jwt.decode(token) as IJwtDecoded
    }

    return payload
  }

  public isExpirationDateValid(expiration: number): boolean {
    return expiration > Math.floor(Date.now() / 1000)
  }

  public async remove(login: string): Promise<void> {
    const authUser = await authRepository.getByLogin(login)

    await authRepository.deleteById(authUser._id)
  }
}

export default DefaultAuthServiceProvider
