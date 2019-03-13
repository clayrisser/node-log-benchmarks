export default class Metrics {
  log = f => f;

  constructor(log) {
    if (log) this.log = log;
  }

  benchmark(options) {
    const { iterations = 1000, message = 'Hello, world!' } = options;
    const startTime = Date.now();
    for (let i = 0; i < iterations; i++) {
      this.log(message);
    }
    const endTime = Date.now();
    const time = endTime - startTime;
    return {
      iterations,
      startTime,
      endTime,
      time,
      message
    };
  }
}
