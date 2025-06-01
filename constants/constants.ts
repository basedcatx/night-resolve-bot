import ms from 'ms';
import { GuildConfig } from '../types/types';

export const TIMEOUTS = {
  HELP_TIMEOUT: ms('10s'),
} as const;

export const DURATIONS = {
  GAME: {
    DAY: ms('1min'),
    NIGHT: ms('2min'),
  },
};

export const GAME_GUILD_SETTINGS_DEFAULTS: GuildConfig = {
  adminRoles: ['admin'],
  minimumPlayers: 5,
  maximumPlayers: 0,
  dayDuration: DURATIONS.GAME.DAY,
  nightDuration: DURATIONS.GAME.NIGHT,
  revealRolesOnDeath: true,
  skipVoteAllowed: false,
  hardcoreMode: false,
  allowSpectators: false,
  gameTheme: 'mafia',
};
