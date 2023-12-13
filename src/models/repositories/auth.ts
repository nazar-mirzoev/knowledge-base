import Auth, { IAuth, IAuthDocument } from '../entities/auth'
import AbstractRepository from './abstract'

export interface IRegistrationCredentials {
  login: string
  password: string
}

class AuthRepository extends AbstractRepository<IAuthDocument> {
  constructor() {
    super(Auth)
  }

  public async getByLogin(login: string): Promise<IAuthDocument> {
    const auth = await this.getOne({ login })
    return auth
  }

  public async findByRefreshToken(token: string): Promise<IAuthDocument> {
    const auth = await this.getOne({ refreshToken: token })
    return auth
  }

  public async update(login: string, payload: Partial<IAuth>): Promise<IAuthDocument> {
    const auth = await this.getByLogin(login)
    const updatedAuth = Object.assign(auth, payload)
    return await updatedAuth.save()
  }

  public async create(credentials: IRegistrationCredentials): Promise<IAuthDocument> {
    return await this.model.create(credentials)
  }
}

export default AuthRepository
