import appmetrics from 'appmetrics';
import consoleLogger from './consoleLogger';
import filesystemLogger from './filesystemLogger';

const logger = console;
appmetrics.monitor();

class WinstonBenchmark {
  console() {
    const startTime = Date.now();
    for (let i = 0; i < 1000000; i++) {
      consoleLogger.info('hello');
    }
    const endTime = Date.now();
    logger.log(`took ${endTime - startTime} milliseconds`);
  }

  filesystem() {
    const startTime = Date.now();
    for (let i = 0; i < 1000000; i++) {
      filesystemLogger.info('hello');
    }
    const endTime = Date.now();
    logger.log(`took ${endTime - startTime} milliseconds`);
  }

  syslog() {}
}

const winstonBenchmark = new WinstonBenchmark();
/* winstonBenchmark.console(); */
winstonBenchmark.filesystem();
winstonBenchmark.syslog();
