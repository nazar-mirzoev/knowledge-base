import { IUserDocument } from '#/models/entities/user'
import { IUserTokens } from '#/services/auth/types'

export interface ISignInResult extends IUserTokens {
  user: IUserDocument
}
