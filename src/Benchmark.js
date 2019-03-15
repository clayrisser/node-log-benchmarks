import Logger from './Logger';

export default class Benchmark {
  appmetrics = true;

  iterations = 1000;

  logger = new Logger();

  loggerName = '';

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
      loggerName: this.loggerName,
      message: this.message,
      transportName: 'console'
    });
  }

  filesystem() {
    return this.logger.filesystem.benchmark({
      appmetrics: this.appmetrics,
      iterations: this.iterations,
      loggerName: this.loggerName,
      message: this.message,
      transportName: 'filesystem'
    });
  }

  syslog() {
    return this.logger.syslog.benchmark({
      appmetrics: this.appmetrics,
      iterations: this.iterations,
      loggerName: this.loggerName,
      message: this.message,
      transportName: 'syslog'
    });
  }
}
