import { Document, FilterQuery, Model, ProjectionType, QueryOptions } from 'mongoose'

import { RecordNotFoundException } from './exceptions'

abstract class AbstractRepository<T extends Document> {
  protected readonly model: Model<T>
  constructor(model: Model<T>) {
    this.model = model
  }

  public async getOne(
    filter: FilterQuery<T>,
    projection: ProjectionType<T> | null = null,
    options: QueryOptions<T> | null = null,
  ): Promise<T> {
    const doc = await this.model.findOne(filter, projection, options)
    if (!doc) throw new RecordNotFoundException()

    return doc
  }

  public async getById(_id: string): Promise<T> {
    return this.getOne({ _id })
  }

  public async exists(filter: FilterQuery<T>): Promise<boolean> {
    const isExists = await this.model.exists(filter)
    return !!isExists
  }

  public async deleteById(_id: string): Promise<T> {
    const doc = await this.model.findOneAndDelete({ _id })
    if (!doc) throw new RecordNotFoundException()

    return doc
  }

  public async find(filter: FilterQuery<T>, options?: QueryOptions<T> | null | undefined): Promise<T[]> {
    return await this.model.find(filter, undefined, options)
  }
}

export default AbstractRepository
