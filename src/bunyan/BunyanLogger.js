import bunyan from 'bunyan';
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

export default class WinstonLogger extends Logger {
  filesystem = new Metrics(message => filesystemLogger.info(message));

  console = new Metrics(message => consoleLogger.info(message));

  syslog = new Metrics(message => message);
}
