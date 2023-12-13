import { userRepository } from '#/models/repositories'
import { IUserTokens } from '#/services/auth/types'
import authService from '#/services/auth'

const refreshTokenAction = async (refreshToken: string, userId: string): Promise<IUserTokens> => {
  const user = await userRepository.getById(userId)

  const tokens = await authService.generateNewTokens(refreshToken, user.email)

  return tokens
}

export default refreshTokenAction
