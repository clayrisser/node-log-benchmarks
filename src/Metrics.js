import Promise from 'bluebird';
import _ from 'lodash';

export default class Metrics {
  log = f => f;

  constructor(log) {
    if (log) this.log = log;
  }

  async benchmark(options) {
    const {
      appmetrics = true,
      iterations = 1000,
      loggerName,
      message = 'Hello, world!',
      transportName
    } = options;
    const prettyMessage = `: ${message}`;
    const monitor = appmetrics
      ? require('./monitor').default
      : {
          on: f => f
        };
    const result = await new Promise(resolve => {
      const cpus = [];
      const gcs = [];
      const loops = [];
      const memories = [];
      monitor.on('cpu', cpu => cpus.push(cpu));
      monitor.on('gc', gc => gcs.push(gc));
      monitor.on('loop', loop => loops.push(loop));
      monitor.on('memory', memory => memories.push(memory));
      monitor.on('benchmarked', resolve);
      const startTime = Date.now();
      const hrStart = process.hrtime();
      for (let i = 0; i < iterations; i++) {
        this.log(i + prettyMessage);
      }
      const hrEnd = process.hrtime(hrStart);
      const time = hrEnd[0] * 1000 + hrEnd[1] / 1000000;
      const endTime = startTime + hrEnd;
      const result = {
        cpus,
        endTime,
        gcs,
        iterations,
        loggerName,
        loops,
        memories,
        message,
        startTime,
        time,
        transportName
      };
      if (appmetrics) return monitor.emit('benchmarked', result);
      return resolve(result);
    });
    result.cpus = _.map(result.cpus, cpu => ({
      ...cpu,
      relative_time: cpu.time - result.startTime
    }));
    result.memories = _.map(result.memories, memory => ({
      ...memory,
      relative_time: memory.time - result.startTime
    }));
    if (loggerName === 'winston' && transportName === 'syslog') {
      setTimeout(() => process.exit(), 0);
    }
    return result;
  }
}
