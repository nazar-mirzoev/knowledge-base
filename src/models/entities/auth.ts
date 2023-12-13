import { Document, Schema } from 'mongoose'

import dbService from '#/services/db'

export interface IAuth {
  login: string
  password: string
  accessToken?: string
  refreshToken?: string
}

export interface IAuthDocument extends IAuth, Document {}

const AuthSchema = new Schema<IAuthDocument>({
  login: {
    type: String,
    required: true,
    unique: true,
    index: true,
  },
  password: {
    type: String,
    required: true,
  },
  accessToken: {
    type: String,
  },
  refreshToken: {
    type: String,
  },
})

const Auth = dbService.model<IAuthDocument>('Auth', AuthSchema)

export default Auth
