import WinstonLogger from './WinstonLogger';
import Benchmark from '../Benchmark';

export default class WinstonBenchmark extends Benchmark {
  logger = new WinstonLogger();
}
