import { Document, ObjectId, Schema } from 'mongoose'
import dbService from '#/services/db'

export interface IUser {
  email: string
  articles: ObjectId[]
}

export interface IUserDocument extends IUser, Document {}

const UserSchema = new Schema<IUserDocument>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    articles: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Article',
      },
    ],
  },
  {
    timestamps: true,
  },
)

const User = dbService.model<IUserDocument>('User', UserSchema)

export default User
