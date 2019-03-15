import WinstonLogger from './WinstonLogger';
import Benchmark from '../Benchmark';

export default class WinstonBenchmark extends Benchmark {
  loggerName = 'winston';

  logger = new WinstonLogger();
}
