import fs from 'fs-extra';
import path from 'path';

const { argv } = process;
const jsonFile = path.resolve(process.cwd(), argv[2]);

async function main() {
  const body = (await fs.readFile(jsonFile)).toString();
  const json = JSON.stringify(body);
  await cpusToCsv(json.cpus);
}

async function cpusToCsv(cpus) {
  const csvFile = path.resolve(process.cwd(), 'something.csv');
  const cpusCsv = cpus; // convert to csv here
  await fs.writeFile(csvFile, cpusCsv);
}

main();
