import { userRepository } from '#/models/repositories'
import authService from '#/services/auth'

import { IUserDocument } from '#/models/entities/user'

const removeUserAction = async (id: string): Promise<IUserDocument> => {
  const user = await userRepository.deleteById(id)

  await authService.remove(user.email)

  return user
}

export default removeUserAction
