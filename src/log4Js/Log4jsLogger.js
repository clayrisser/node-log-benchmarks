import log4js from 'log4js';
import Logger from '../Logger';
import Metrics from '../Metrics';


log4js.configure({
  appenders: {
    fileLogs: { type: 'file', filename: 'log4js.log' },
    console: { type: 'console' },
    syslog: {
      type: 'log4js-syslog-appender',
    
        host: 'localhost',
        port: 514,
        protocol: 'unix',
        path: '/dev/log',
        facility: 'local0',
        useUdpSyslog: true,
        product: 'basic-udp-test'
      
    }
  },
  categories: {
    filesystem: { appenders: ['fileLogs'], level: 'info' },
    console: { appenders: ['console'], level: 'info' },
    syslog: { appenders: ['syslog'], level: 'info' },
    default: { appenders: ['console'], level: 'trace' }
  }
});

const consoleLogger = log4js.getLogger('console');

const filesystemLogger = log4js.getLogger('filesystem');

const sysLogger = log4js.getLogger('syslog');


export default class Log4jsLogger extends Logger {
  filesystem = new Metrics(message => filesystemLogger.info(message));

  console = new Metrics(message => consoleLogger.info(message));

  syslog = new Metrics(message => sysLogger.info(message));
}
