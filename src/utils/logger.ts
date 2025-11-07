import pino from 'pino';
import chalk from 'chalk';

const logger = pino(
  {
    transport: {
      target: 'pino-pretty',
      options: { colorize: true },
    },
  },
  pino.destination({ sync: false }),
);

export const log = {
  info: (msg: unknown, context?: object) => {
    logger.info(context, chalk.green(msg));
  },
  error: (error: unknown, context?: object) => {
    logger.error(context, chalk.red(JSON.stringify(error)));
  },
};
