import Log4jsLogger from './Log4jsLogger';
import Benchmark from '../Benchmark';

export default class Log4jsBenchmark extends Benchmark {
  loggerName = 'log4js';

  logger = new Log4jsLogger();
}
