import authService from '#/services/auth'
import { userRepository } from '#/models/repositories'
import normalizeEmail from '#/utils/normalize/email'

import { IRegistrationCredentials } from '#/models/repositories/auth'
import { IUserDocument } from '#/models/entities/user'

const createUserAction = async (email: string, password: string): Promise<IUserDocument> => {
  email = normalizeEmail(email)

  const registrationCredentials: IRegistrationCredentials = {
    login: email,
    password,
  }

  const isUser = await userRepository.exists({ email })
  if (isUser) {
    throw new Error(`User with email ${email} already exists`)
  }

  const user = await userRepository.create(email)

  try {
    await authService.register(registrationCredentials)
    return user
  } catch (err) {
    await userRepository.deleteById(user._id)

    throw err
  }
}

export default createUserAction
