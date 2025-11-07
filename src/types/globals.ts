export const MAX_PLAYER_IN_GAME = 20;
export const MIN_PLAYER_IN_GAME = 4;
export const MAX_ACTIVE_GAME_THREADS_PER_CHANNEL = 20;
export const LOBBY_BASE_DURATION = 50_000;
export const LOBBY_EXTENDED_DURATION = 30_000;

export const PLAYER_ROLES = {
  doctor: {
    can_kill: false,
    can_ressurect: true,
  },
  townie: {
    can_kill: false,
    can_ressurect: false,
  },
  mafia: {
    can_kill: true,
    can_ressurect: false,
  },
  none: {
    can_kill: false,
    can_ressurect: false,
  },
};

export type PLAYER_ROLES_TYPE = keyof typeof PLAYER_ROLES;
