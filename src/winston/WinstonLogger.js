import winston from 'winston';
import Logger from '../Logger';
import Metrics from '../Metrics';

const consoleLogger = winston.createLogger({
  transports: [
    new winston.transports.Console({
      format: winston.format.simple()
    })
  ]
});

const filesystemLogger = winston.createLogger({
  transports: [new winston.transports.File({ filename: 'logs.log' })]
});

export default class WinstonLogger extends Logger {
  filesystem = new Metrics(message => filesystemLogger.info(message));

  console = new Metrics(message => consoleLogger.info(message));

  syslog = new Metrics(message => message);
}
