import winston from 'winston';
import Logger from '../Logger';
import Metrics from '../Metrics';

require('winston-syslog').Syslog;

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
  type: 'sys',
  host: 'localhost',
  port: 514,
  facility: 'local0',
  protocol: "unix",
  path: "/dev/log",
  app_name:"Node logging Benchmark"
}

const syslogLogger = winston.createLogger({
  transports: [new winston.transports.Syslog(options)]
});


export default class WinstonLogger extends Logger {
  filesystem = new Metrics(message => filesystemLogger.info(message));

  console = new Metrics(message => consoleLogger.info(message));

  syslog = new Metrics(message => syslogLogger.info(message));
}
