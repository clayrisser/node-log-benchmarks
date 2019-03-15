import express from 'express';
import morgan from 'morgan';
import stream from 'stream';
import winston from 'winston';
// eslint-disable-next-line no-unused-vars
import { Syslog } from 'winston-syslog';
import fs from 'fs';
import syslog from 'syslog'; // Use package "syslog" for TCP
import util from 'util';
import Logger from '../Logger';
import Metrics from '../Metrics';

const app = express();


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

class MyStream {
  write(text) {
    syslogLogger.info(text)
  }
}
const myStream = new MyStream()

app.use(require("morgan")("combined", { "stream": myStream }));

const accessLogStream = fs.createWriteStream('morgan.log', { flags: 'a' });

app.use(morgan('combined', { stream: accessLogStream }));

app.use(morgan('combined', { stream: process.stdout }));

app.get('/', (req, res) => {
  res.send('Hello World!\n');
});

app.listen(3000);

export default class WinstonLogger extends Logger {
  filesystem = new Metrics(message => filesystemLogger.info(message));

  console = new Metrics(message => consoleLogger.info(message));

  syslog = new Metrics(message => message);
}
