import Promise from 'bluebird';
import _ from 'lodash';

export default class Metrics {
  log = f => f;

  constructor(log) {
    if (log) this.log = log;
  }

  async benchmark(options) {
    const {
      iterations = 1000,
      message = 'Hello, world!',
      appmetrics = true
    } = options;
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
      for (let i = 0; i < iterations; i++) {
        this.log(message);
      }
      const endTime = Date.now();
      const time = endTime - startTime;
      const result = {
        cpus,
        endTime,
        gcs,
        iterations,
        loops,
        memories,
        message,
        startTime,
        time
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
    return result;
  }
}
