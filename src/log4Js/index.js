import Log4jsLogger from './Log4jsLogger';
import Benchmark from '../Benchmark';

export default class Log4jsBenchmark extends Benchmark {
  logger = new Log4jsLogger();
}
