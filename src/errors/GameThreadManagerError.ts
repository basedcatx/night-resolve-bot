import { error_types } from '../types/types';

type error_codes =
  | 'GAME_MAX_PLAYER_ERROR'
  | 'GAME_PLAYER_ALREADY_IN_QUEUE'
  | 'GAME_PLAYER_NOT_IN_QUEUE'
  | 'GAME_ONGOING'
  | 'GAME_CANNOT_CREATE_THREAD_ERROR';

export class GameThreadManagerError extends Error {
  private readonly m: string;
  private readonly c: error_codes;
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
