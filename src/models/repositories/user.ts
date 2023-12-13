import User, { IUserDocument } from '../entities/user'
import AbstractRepository from './abstract'

class UserRepository extends AbstractRepository<IUserDocument> {
  constructor() {
    super(User)
  }

  public async getByEmail(email: string): Promise<IUserDocument> {
    return await this.getOne({ email })
  }

  public async create(email: string): Promise<IUserDocument> {
    return await User.create({ email })
  }
}

export default UserRepository
