import WinstonBenchmark from './winston';

const winstonBenchmark = new WinstonBenchmark({
  iterations: 1000000
});

const result = winstonBenchmark.console();

console.log(result);
