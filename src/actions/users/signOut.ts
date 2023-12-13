import authService from '#/services/auth'

import { ICurrentUser } from '#/http/types'

const sighInAction = async (user: ICurrentUser): Promise<void> => {
  await authService.signOut(user.email)
}

export default sighInAction
