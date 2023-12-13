import authService from '#/services/auth'
import logger from '#/services/logger'
import { userRepository } from '#/models/repositories'
import normalizeEmail from '#/utils/normalize/email'
import { defaultUserConfig } from '#/config'

import { IRegistrationCredentials } from '#/models/repositories/auth'

const createDefaultUser = async () => {
  const password = defaultUserConfig.password
  let email = defaultUserConfig.email

  email = normalizeEmail(email)

  const registrationCredentials: IRegistrationCredentials = {
    login: email,
    password,
  }

  const isUser = await userRepository.exists({ email })
  if (isUser) return

  logger.info(`Creating default user with email ${email}`)

  const user = await userRepository.create(email)

  try {
    await authService.register(registrationCredentials)
  } catch (err) {
    await userRepository.deleteById(user._id)
  }
}

export default createDefaultUser
