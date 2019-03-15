import winston from 'winston';
// eslint-disable-next-line no-unused-vars
import { Syslog } from 'winston-syslog';
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

const options = {
  level: 'info',
  type: '5424',
  host: 'localhost',
  port: 514,
  facility: 'local0',
  protocol: 'unix',
  path: '/dev/log',
  app_name: 'Node logging Benchmark'
};

const syslogLogger = winston.createLogger({
  transports: [new winston.transports.Syslog(options)]
});

export default class WinstonLogger extends Logger {
  filesystem = new Metrics(message => filesystemLogger.info(message));

  console = new Metrics(message => consoleLogger.info(message));

  syslog = new Metrics(message => syslogLogger.info(message));
}
