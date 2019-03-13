import Logger from './Logger';

export default class Benchmark {
  appmetrics = true;

  iterations = 1000;

  logger = new Logger();

  message = 'Hello, world!';

  constructor(options = {}) {
    const {
      appmetrics = true,
      iterations = 1000,
      message = 'Hello, world!'
    } = options;
    this.appmetrics = appmetrics;
    this.iterations = iterations;
    this.message = message;
  }

  console() {
    return this.logger.console.benchmark({
      appmetrics: this.appmetrics,
      iterations: this.iterations,
      message: this.message
    });
  }

  filesystem() {
    return this.logger.filesystem.benchmark({
      appmetrics: this.appmetrics,
      iterations: this.iterations,
      message: this.message
    });
  }

  syslog() {
    return this.logger.syslog.benchmark({
      appmetrics: this.appmetrics,
      iterations: this.iterations,
      message: this.message
    });
  }
}
