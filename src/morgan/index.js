import MorganLogger from './MorganLogger';
import Benchmark from '../Benchmark';

export default class MorganBenchmark extends Benchmark {
  logger = new MorganLogger();
}
