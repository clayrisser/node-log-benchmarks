import Logger from './Logger';

export default class Benchmark {
  iterations = 1000;

  logger = new Logger();

  message = 'Hello, world!';

  constructor(options = {}) {
    const { iterations = 1000, message = 'Hello, world!' } = options;
    this.iterations = iterations;
    this.message = message;
  }

  console() {
    return this.logger.console.benchmark({
      iterations: this.iterations,
      message: this.message
    });
  }

  filesystem() {
    return this.logger.filesystem.benchmark({
      iterations: this.iterations,
      message: this.message
    });
  }

  syslog() {
    return this.logger.syslog.benchmark({
      iterations: this.iterations,
      message: this.message
    });
  }
}
