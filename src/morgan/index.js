import MorganLogger from './MorganLogger';
import Benchmark from '../Benchmark';

export default class MorganBenchmark extends Benchmark {
  loggerName = 'morgan';

  logger = new MorganLogger();
}
