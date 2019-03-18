import 'winston-syslog';
import winston from 'winston';
import Logger from '../Logger';
import Metrics from '../Metrics';

const { env } = process;

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

const syslogLogger = winston.createLogger({
  transports: [
    new winston.transports.Syslog({
      protocol: env.PROTOCOL === 'UDP' ? 'udp4' : 'tcp4'
    })
  ]
});

export default class WinstonLogger extends Logger {
  filesystem = new Metrics(message => filesystemLogger.info(message));

  console = new Metrics(message => consoleLogger.info(message));

  syslog = new Metrics(message => syslogLogger.info(message));
}
