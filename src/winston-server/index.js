import express from 'express';
import expressWinston from 'express-winston';
import winston from 'winston';
import 'winston-syslog';

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
      new winston.transports.Syslog({
        protocol: env.PROTOCOL === 'UDP' ? 'udp4' : 'tcp4'
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
