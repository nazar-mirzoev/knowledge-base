import { dbConfig } from '#/config'
import DBService from './service'

const dbService = new DBService(dbConfig)

export default dbService
