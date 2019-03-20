import _ from 'lodash';
import fs from 'fs-extra';
import path from 'path';

const Json2csvParser = require('json2csv').Parser;

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

const dir = './results';

if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir);
}

async function main() {
  let result = {};
  process.on('exit', () => {
    const asyncEndTime = Date.now();
    result = {
      ...result,
      asyncEndTime,
      asyncTime: asyncEndTime - result.startTime
    };
    writeJson(result);
    json2csv('cpus', result.cpus);
    json2csv('gcs', result.gcs);
    json2csv('memories', result.memories);
    json2csv('loops', result.loops);

    // save result to file (results/1000000/winston.console.appmetrics.json)
    // do your csv logic here
    logger.log(result);
  });
  result = await benchmark[metricsName]();
}

function writeJson(result) {
  const dir = `./results/${iterations}`;
  const jsonData = JSON.stringify(result);
  let appmetricName = '';

  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }
  if (appmetrics) {
    appmetricName = 'appmetrics.';
  }
  const jsonFile = path.resolve(
    `./results/${iterations}/${benchmarkName}.console.${appmetricName}json`
  );
  fs.writeFileSync(jsonFile, jsonData, 'utf8');
  return result;
}

async function json2csv(matricName, matricsData) {
  let appmetricName = '';
  let fields;
  if (appmetrics) {
    appmetricName = 'appmetrics.';
  }
  if (matricName === 'gcs') {
    fields = ['time', 'type', 'size', 'used', 'duration'];
  } else if (matricName === 'memories') {
    fields = [
      'time',
      'physical_total',
      'physical_used',
      'physical',
      'private',
      'virtual',
      'physical_free',
      'relative_time'
    ];
  } else if (matricName === 'cpus') {
    fields = ['time', 'process', 'system'];
  } else if (matricName === 'loops') {
    fields = [
      'count',
      'minimum',
      'maximum',
      'average',
      'cpu_user',
      'cpu_system'
    ];
  }
  const json2csvParser = new Json2csvParser({ fields });
  const csv = json2csvParser.parse(matricsData);
  fs.writeFileSync(
    `results/${iterations}/${benchmarkName}.console.${appmetricName}${matricName}.csv`,
    csv
  );
}

main();
