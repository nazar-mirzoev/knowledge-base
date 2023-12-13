export class RecordNotFoundException extends Error {
  constructor() {
    super('Record not found')
    this.name = 'RecordNotFoundException'
  }
}
