export interface ILoggerServiceProviderConfig {
  filename?: string
  filesPath?: string
  filesMaxSize?: string
  filesRetentionInterval?: string
}

export interface ILoggerServiceProvider {
  info(payload: string | object, ...args: Array<unknown>): void
  debug(payload: string | object, ...args: Array<unknown>): void
  error(error: Error | object, ...args: Array<unknown>): void
}
