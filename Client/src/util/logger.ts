import { createLogger, format, transports } from 'winston'
import WinstonCloudWatch from 'winston-cloudwatch'
import Constants from './constants'

const logLevel = (process.env.NODE_ENV === 'production') ? 'info' : 'debug'

const winstonTransports: any = [
  new transports.File({ filename: 'logs/error.log', level: 'error' }),
  new transports.File({ filename: 'logs/combined.log' }),
]


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


export default logger
