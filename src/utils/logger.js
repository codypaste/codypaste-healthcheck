const path = require('path');
const fs = require('fs');
const winston = require('winston');

const LOGS_PATH = '../../logs/codypaste-healthcheck.log';
const filename = fs.existsSync(LOGS_PATH)
  ? LOGS_PATH
  : path.join(__dirname, LOGS_PATH);

const logger = winston.createLogger({
  transports: [new winston.transports.File({ filename })],
});

if (process.env.NODE_ENV !== 'production') {
  logger.add(
    new winston.transports.Console({
      format: winston.format.simple(),
    }),
  );
}

module.exports = logger;
