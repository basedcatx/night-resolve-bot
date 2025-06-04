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
  ADMIN_ROLES: 'adminRoles',
  MIN_PLAYERS: 'minimumPlayers',
  MAX_PLAYERS: 'maximumPlayers',
  DAY_DURATION: 'dayDuration',
  NIGHT_DURATION: 'nightDuration',
  REVEAL_ROLES: 'revealRolesOnDeath',
  SKIP_VOTE: 'skipVoteAllowed',
  HARDCORE_MODE: 'hardcoreMode',
  ALLOW_SPECTATORS: 'allowSpectators',
  GAME_THEME: 'gameTheme'
} as const;
