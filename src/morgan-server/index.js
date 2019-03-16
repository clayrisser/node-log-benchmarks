import express from 'express';
import morgan from 'morgan';
import stream from 'stream';
import util from 'util';

const { env } = process;
const options = {
  port: 3000,
  protocol: env.PROTOCOL || 'TCP'
};
const app = express();
const logger = console;
const syslog = require(options.protocol === 'UDP' ? 'syslogudp' : 'syslog');

class SyslogStream {
  logger = syslog.createClient(514, 'localhost');

  write(chunk) {
    this.logger.info(chunk);
  }
}
stream.Writable.call(this, { decodeStrings: false });
util.inherits(SyslogStream, stream.Writable);

app.use(morgan('combined', { stream: new SyslogStream() }));

app.get('/', (req, res) => {
  res.send('Hello, world!');
});

app.listen(options.port, err => {
  if (err) {
    logger.error(err);
    process.exit(1);
  }
  logger.info(`listening on port ${options.port}`);
});
