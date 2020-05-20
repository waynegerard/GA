import { createLogger, format, transports } from 'winston'
import WinstonCloudWatch from 'winston-cloudwatch'
import Constants from './constants'

const logLevel = (process.env.NODE_ENV === 'production') ? 'info' : 'debug'

const winstonTransports: any = [
  new transports.File({ filename: 'logs/error.log', level: 'error' }),
  new transports.File({ filename: 'logs/combined.log' }),
]

if (process.env.NODE_ENV !== 'test') {
  const cwTransport = new WinstonCloudWatch({
    logGroupName: 'io',
    logStreamName: Constants.AWS_LOG_STREAM,
    awsAccessKeyId: Constants.AWS_LOG_ACCESS_KEY_ID,
    awsSecretKey: Constants.AWS_LOG_SECRET_KEY,
    awsRegion: "us-east-1",
    jsonMessage: true,
  })
  winstonTransports.push(cwTransport)
}

const logger = createLogger({
  level: logLevel,
  format: format.combine(
    format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss',
    }),
    format.errors({ stack: true }),
    format.splat(),
    format.json(),
  ),
  transports: winstonTransports,
});

// Also write to the console in development
if (process.env.NODE_ENV !== 'production') {
  logger.add(new transports.Console({
    format: format.combine(
      format.colorize(),
      format.simple(),
    ),
  }))
}

export default logger
