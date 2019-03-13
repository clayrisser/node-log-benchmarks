import Metrics from './Metrics';

export default class Logger {
  filesystem = new Metrics(message => message);

  console = new Metrics(message => message);

  syslog = new Metrics(message => message);
}
