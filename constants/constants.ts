import ms from 'ms';
import { GuildChannelConfig } from '../types/types';

export const SETTINGS_COMMANDS = {
  SETTINGS: { NAME: 'settings', DESCRIPTION: 'Generic command to display all settings and their options.' },
  SETTINGS_ADD: {
    NAME: 'settings add',
    DESCRIPTION: 'This command is used to append a value to a settings option that can take multiple multiple values',
  },
  SETTINGS_SET: { NAME: 'settings set', DESCRIPTION: 'Overrides/Sets a field value' },
  SETTINGS_RESET: { NAME: 'settings reset', DESCRIPTION: "Resets a specified field to it's default value." },
} as const;

export const SETTINGS = {
  ADMIN_ROLES: 'admin',
  MIN_PLAYERS: 'min',
  MAX_PLAYERS: 'max',
  REVEAL_ROLES: 'reveal',
  PHASE_DURATION: 'duration',
  SKIP_VOTE: 'skip',
  HARDCORE_MODE: 'hardcore',
  ALLOW_SPECTATORS: 'spectators',
  GAME_THEME: 'theme',
} as const;

export const TIMEOUTS = {
  DEFAULT_TIMEOUT: ms('10s'),
} as const;

export const DURATIONS = {
  GAME: {
    PHASE_DURATION: 60,
  },
};

export const GAME_GUILD_CHANNEL_SETTINGS_DEFAULTS: GuildChannelConfig = {
  admin: ['admin'],
  min: 5,
  max: 0,
  duration: 20,
  reveal: true,
  skip: false,
  hardcore: false,
  spectators: false,
  theme: 'mafia',
};

export const HELP_COMMANDS = {
  HELP: {
    NAME: 'help',
    DESCRIPTION: 'Generic command to display all general help options.',
  },
};

export type HELPCOMMANDTYPE = typeof HELP_COMMANDS;
