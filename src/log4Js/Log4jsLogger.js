import log4js from 'log4js';
import Logger from '../Logger';
import Metrics from '../Metrics';

log4js.configure({
  appenders: {
    fileLogs: { type: 'file', filename: 'log4js.log' },
    console: { type: 'console' },
    syslog: {
      type: 'log4js-qradar-syslog-appender',
      options: {
        host: 'syslog.prd.ccs.ibmcloud.com',
        port: 6514,
        facility: 'local0',
        protocol: 'unix',
        path: '/dev/log',
        tag: 'Log4js Node logging Benchmark',
        product: 'otc-api"',
        url: 'devops.ng.bluemix.net'
      }
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

sysLogger.info('vijaya kandi vfdgdfg');

export default class Log4jsLogger extends Logger {
  filesystem = new Metrics(message => filesystemLogger.info(message));

  console = new Metrics(message => consoleLogger.info(message));

  syslog = new Metrics(message => sysLogger.info(message));
}
