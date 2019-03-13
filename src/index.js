import _ from 'lodash';

const { argv } = process;
const name = argv[2];
const benchmarkName = _.camelCase(
  name.substr(0, name.indexOf(':')) || 'winston'
);
const metricsName = _.camelCase(
  name.substr(name.indexOf(':'), name.length - 1) || 'console'
);
const appmetrics = _.includes(argv, '--appmetrics');
const iterations = Number(argv[3] || 1000);
const logger = console;
const Benchmark = require(`./${benchmarkName}`).default;
const benchmark = new Benchmark({
  appmetrics,
  iterations
});

async function main() {
  let result = {};
  process.on('exit', () => {
    const asyncEndTime = Date.now();
    result = {
      ...result,
      asyncEndTime,
      asyncTime: asyncEndTime - result.startTime
    };
    logger.log(result);
  });
  result = await benchmark[metricsName]();
}

main();
