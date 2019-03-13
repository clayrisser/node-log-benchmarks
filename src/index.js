import WinstonBenchmark from './winston';

const winstonBenchmark = new WinstonBenchmark({
  iterations: 1000000,
  appmetrics: true
});

async function main() {
  let result = {};
  process.on('exit', () => {
    const asyncEndTime = Date.now();
    console.log({
      ...result,
      asyncEndTime,
      asyncTime: asyncEndTime - result.startTime
    });
  });
  result = await winstonBenchmark.filesystem();
}

main();
