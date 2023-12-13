import winston from 'winston'
import DailyRotateFile from 'winston-daily-rotate-file'

import { mkdirSync } from 'fs'

import { ILoggerServiceProvider, ILoggerServiceProviderConfig } from '../types'

class LoggerServiceProviderWinston implements ILoggerServiceProvider {
  #logger: winston.Logger

  constructor(config: ILoggerServiceProviderConfig) {
    if (config.filesPath) {
      mkdirSync(config.filesPath, { recursive: true })
    }

    const format = winston.format.combine(
      winston.format.timestamp(),
      winston.format.printf((info) => `${info.timestamp} ${info.level}: ${info.message}`),
    )

    this.#logger = winston.createLogger({
      format: format,
      transports: [
        new DailyRotateFile({
          filename: config.filename,
          dirname: config.filesPath,
          datePattern: 'YYYY-MM-DD',
          maxSize: config.filesMaxSize,
          maxFiles: config.filesRetentionInterval,
        }),
      ],
    })

    if (process.env.NODE_ENV !== 'production') {
      this.#logger.add(
        new winston.transports.Console({
          format: format,
        }),
      )
    }
  }

  public info(payload: string | object, ...args: Array<unknown>) {
    let message = payload

    if (typeof message !== 'string') {
      message = JSON.stringify(message)
    }

    this.#logger.info(message, ...args)
  }

  public debug(payload: string | object, ...args: Array<unknown>) {
    let message = payload

    if (typeof message !== 'string') {
      message = JSON.stringify(message)
    }

    this.#logger.debug(message, ...args)
  }

  public error(error: Error | object, ...args: Array<unknown>) {
    let message = ''

    if (error instanceof Error) {
      message = error.toString()
    } else {
      message = JSON.stringify(error)
    }

    this.#logger.error(message, ...args)
  }
}

export default LoggerServiceProviderWinston
