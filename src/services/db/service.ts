import mongoose, { Schema, Model } from 'mongoose'
import { IDBServiceConfig } from './types'

class DBService {
  #config: IDBServiceConfig
  #connection: mongoose.Connection

  public constructor(config: IDBServiceConfig) {
    this.#config = config
    this.#connection = mongoose.createConnection(this.#config.connectionString, {
      dbName: this.#config.name,
    })
  }

  public model<T, U = Model<T>>(name: string, schema: Schema<T>, collectionName?: string): U {
    return this.#connection.model<T, U>(name, schema, collectionName)
  }
}

export default DBService
