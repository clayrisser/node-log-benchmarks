import bunyan from 'bunyan';
import bsyslog from 'bunyan-syslog';
import Logger from '../Logger';
import Metrics from '../Metrics';

const consoleLogger = bunyan.createLogger({
  name: 'console',
  stream: process.stdout,
  level: 'info'
});

const filesystemLogger = bunyan.createLogger({
  name: 'filesystem',
  streams: [
    {
      path: 'bunyan.log',
      type: 'file'
    }
  ]
});

const syslogLogger = bunyan.createLogger({
  name: 'syslog',
  streams: [
    {
      level: 'info',
      type: 'raw',
      stream: bsyslog.createBunyanStream({
        type: 'sys',
        facility: bsyslog.local0,
        host: 'localhost',
        port: 514
      })
    }
  ]
});

export default class WinstonLogger extends Logger {
  filesystem = new Metrics(message => filesystemLogger.info(message));

  console = new Metrics(message => consoleLogger.info(message));

  syslog = new Metrics(message => syslogLogger.info(message));
}
