import { ObjectId } from 'mongoose'

export enum HTTPStatus {
  OK = 200,
  BadRequest = 400,
  Unauthorized = 401,
  NotFound = 404,
  InternalServerError = 500,
}

export interface ICurrentUser {
  _id: ObjectId
  email: string
}

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Express {
    export interface Request {
      user: ICurrentUser
    }
  }
}
