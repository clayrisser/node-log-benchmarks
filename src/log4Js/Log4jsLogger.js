import log4js from 'log4js';
import Logger from '../Logger';
import Metrics from '../Metrics';

const consoleLogger = log4js.getLogger();
consoleLogger.level = 'info'; // default level is OFF - which means no logs at all.

log4js.configure({
  appenders: {
    everything: { type: 'file', filename: 'log4js.log' }
  },
  categories: {
    default: { appenders: ['everything'], level: 'info' }
  }
});

const filesystemLogger = log4js.getLogger();

export default class Log4jsLogger extends Logger {
  filesystem = new Metrics(message => filesystemLogger.info(message));

  console = new Metrics(message => consoleLogger.info(message));

  syslog = new Metrics(message => message);
}
