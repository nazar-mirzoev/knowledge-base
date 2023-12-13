import { ISignInResult } from '#/actions/users/types'
import { IUserDocument } from '#/models/entities/user'
import { ISignInDTO, IUserDTO } from '../dto/user'

class UserAdapter {
  public static signIn(signInResult: ISignInResult): ISignInDTO {
    const { accessToken, refreshToken } = signInResult
    return {
      accessToken,
      refreshToken,
      id: signInResult.user._id.toString(),
    }
  }

  public static toJson(user: IUserDocument): IUserDTO {
    return {
      _id: user._id.toString(),
      email: user.email,
    }
  }
}

export default UserAdapter
