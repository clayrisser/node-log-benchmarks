import winston from 'winston';

const consoleLogger = winston.createLogger({
  transports: [
    new winston.transports.Console({
      format: winston.format.simple()
    })
  ]
});

export default consoleLogger;
