import express from 'express';
import 'winston-rsyslog2';
import expressWinston from 'express-winston';
import winston from 'winston';

const { env } = process;
const options = {
  port: 3000,
  protocol: env.PROTOCOL || 'TCP'
};
const app = express();
const logger = console;

app.use(
  expressWinston.logger({
    transports: [
      new winston.transports.Rsyslog({
        protocol: options.protocol === 'UDP' ? 'U' : 'T'
      })
    ]
  })
);

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
