import { error_types } from '../types/types';

type error_codes =
  | 'player_not_in_game_error'
  | 'invalid_state_error'
  | 'player_state_dead_error'
  | 'player_state_spectating_error';

export class PlayerManagerError extends Error {
  private readonly c: error_codes;
  private readonly m: string;
  private readonly ct: { type: error_types; obj?: object };

  constructor(msg: string, cause: error_codes, ctx: { type: error_types; obj?: object }) {
    super(msg, { cause, ...ctx });
    this.c = cause;
    this.m = msg;
    this.ct = ctx;
  }

  public get ctx() {
    return this.ct;
  }
}
