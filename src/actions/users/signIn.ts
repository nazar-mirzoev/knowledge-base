import normalizeEmail from '#/utils/normalize/email'
import { userRepository } from '#/models/repositories'
import authService from '#/services/auth'

import { ISignInResult } from './types'

const sighInAction = async (email: string, password: string): Promise<ISignInResult> => {
  email = normalizeEmail(email)

  const user = await userRepository.getByEmail(email)

  const authResult = await authService.signIn(email, password)

  return { ...authResult, user }
}

export default sighInAction
