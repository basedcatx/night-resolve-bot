import pino from 'pino';
import chalk from 'chalk';

enum LOG_LEVELS {
  INFO,
  WARNING,
  DEBUG,
  ERROR,
}

const logger = (level: LOG_LEVELS) => {
  switch (level) {
    case LOG_LEVELS.INFO:
      return pino({ level: 'info' });
    case LOG_LEVELS.ERROR:
      return pino({ level: 'error' });
    case LOG_LEVELS.WARNING:
      return pino({ level: 'warn' });
    case LOG_LEVELS.DEBUG:
      return pino({ level: 'debug' });
  }
};

export function LogInfo(content: string) {
  logger(LOG_LEVELS.INFO).info(chalk.green(content));
}

export function LogError(content: string) {
  logger(LOG_LEVELS.ERROR).info(chalk.red(content));
}

export function LogWarn(content: string) {
  logger(LOG_LEVELS.WARNING).info(chalk.yellow(content));
}

export function LogDebug(content: string) {
  logger(LOG_LEVELS.DEBUG).info(chalk.blue(content));
}
