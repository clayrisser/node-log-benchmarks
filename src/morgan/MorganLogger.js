import morgan from 'morgan';
import fs from 'fs';
import Logger from '../Logger';
import Metrics from '../Metrics';

const consoleLogger = morgan('combined');

const accessLogStream = fs.createWriteStream('morgan.log', { flags: 'a' });

const filesystemLogger = morgan('combined', { stream: accessLogStream });

export default class WinstonLogger extends Logger {
  filesystem = new Metrics(message => filesystemLogger.info(message));

  console = new Metrics(message => consoleLogger.info(message));

  syslog = new Metrics(message => message);
}
