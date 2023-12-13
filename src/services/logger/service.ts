import { ILoggerServiceProvider } from './types'

export default class LoggerService {
  #provider: ILoggerServiceProvider

  public constructor(provider: ILoggerServiceProvider) {
    this.#provider = provider
  }

  public info(payload: string | object, ...args: Array<unknown>) {
    this.#provider.info(payload, ...args)
  }

  public debug(payload: string | object, ...args: Array<unknown>) {
    this.#provider.debug(payload, ...args)
  }

  public error(error: Error | object, ...args: Array<unknown>) {
    this.#provider.error(error, ...args)
  }
}
