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
    cpus2csv(result.cpus);
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
    appmetricName = 'appmetrics.'
  }
  const jsonFile = path.resolve(`./results/${iterations}/${benchmarkName}.console.${appmetricName}json`);

  fs.writeFileSync(jsonFile, jsonData, 'utf8')
  return result;
}

async function cpus2csv(result) {
  let appmetricName = '';
  if (appmetrics) {
    appmetricName = 'appmetrics.'
  }
  // const fields = ['End Time', 'Iterations', 'Message'];

  // const myCars = [
  //   {
  //     "car": "Audi",
  //     "price": 40000,
  //     "color": "blue"
  //   }, {
  //     "car": "BMW",
  //     "price": 35000,
  //     "color": "black"
  //   }, {
  //     "car": "Porsche",
  //     "price": 60000,
  //     "color": "green"
  //   }
  // ];

  // const json2csvParser = new Json2csvParser({ fields });
  // const csv = json2csvParser.parse(myCars);

  // fs.writeFileSync(`results/${iterations}/${benchmarkName}.console.${appmetricName}cpus.csv`, csv);
  console.log(`results/${iterations}/${benchmarkName}.console.${appmetricName}cpus.csv`);
}

main();
