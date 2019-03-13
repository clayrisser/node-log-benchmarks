import winston from 'winston';

const filesystemLogger = winston.createLogger({
  transports: [new winston.transports.File({ filename: 'logs.log' })]
});

export default filesystemLogger;
