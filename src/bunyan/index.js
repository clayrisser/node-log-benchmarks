import BunyanLogger from './BunyanLogger';
import Benchmark from '../Benchmark';

export default class BunyanBenchmark extends Benchmark {
  logger = new BunyanLogger();
}
