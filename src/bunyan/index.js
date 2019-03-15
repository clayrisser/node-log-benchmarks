import BunyanLogger from './BunyanLogger';
import Benchmark from '../Benchmark';

export default class BunyanBenchmark extends Benchmark {
  loggerName = 'bunyan';

  logger = new BunyanLogger();
}
