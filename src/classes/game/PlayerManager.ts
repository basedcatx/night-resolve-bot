import { PLAYER_IN_GAME_STATE, PLAYER_STATE_TYPE } from '../../types/states';
import { ClientWithExtendedTypes, Result } from '../../types/types';
import { PlayerManagerError } from '../../errors/PlayerManagerError';
import { PLAYER_ROLES, PLAYER_ROLES_TYPE } from '../../types/globals';

export class PlayerManager {
  private readonly userId: string;
  private player_state: PLAYER_STATE_TYPE = 'idle';
  private in_game_states = 0;
  private player_role: PLAYER_ROLES_TYPE;

  private constructor(userId: string) {
    this.userId = userId;
    this.player_role = 'none';
  }

  public setPlayerRole(role: PLAYER_ROLES_TYPE) {
    this.player_role = role;
  }

  public get id() {
    return `<@${this.userId}>`;
  }

  public toString(): string {
    return this.userId;
  }

  private resetInGameState() {
    this.in_game_states = 0;
  }

  public static createPlayerManager(id: string, client: ClientWithExtendedTypes) {
    const existing = client.playerManagers.get(id);
    if (existing) return existing;

    const playerManager = new PlayerManager(id);
    client.playerManagers.set(id, playerManager);
    return playerManager;
  }

  public static removePlayerFromMem(id: string, client: ClientWithExtendedTypes) {
    const player = client.playerManagers.get(id);
    if (!player) return;
    client.playerManagers.delete(player.id);
  }

  public canKillPlayers(): boolean {
    return PLAYER_ROLES[this.player_role].can_kill;
  }

  public canRessurect(): boolean {
    return PLAYER_ROLES[this.player_role].can_ressurect;
  }

  public async killPlayerInCurrGame(): Promise<Result<void>> {
    if (this.player_state === 'spectating') {
      return {
        ok: false,
        error: new PlayerManagerError('Player is currently spectating his last game', 'player_state_spectating_error', {
          id: this.userId,
          state: this.player_state,
          type: 'user',
          in_game_state: this.in_game_states,
        }),
      };
    }

    if (!(this.player_state == 'in_game')) {
      return {
        ok: false,
        error: new PlayerManagerError('Player is not currently in any game', 'player_not_in_game_error', {
          state: this.player_state,
          in_game_state: this.in_game_states,
          id: this.userId,
          type: 'user',
        }),
      };
    }

    if (this.in_game_states & ~PLAYER_IN_GAME_STATE.is_alive) {
      return {
        ok: false,
        error: new PlayerManagerError(
          'Player is already dead, and is spectating the current game',
          'player_state_dead_error',
          {
            state: this.player_state,
            in_game_state: this.in_game_states,
            id: this.userId,
            type: 'user',
          },
        ),
      };
    }

    /*
     * We set the player to spectating, to watch the end of his game round, make sure he is muted, and dead.
     */

    this.player_state = 'spectating';
    this.in_game_states |= ~PLAYER_IN_GAME_STATE.is_alive | PLAYER_IN_GAME_STATE.is_muted;
    return { ok: true };
  }

  /*
   * I would have had a method to reset the player's state after his/her ends, but for now i think it is pretty useless. It would just be a waste of memory.
   */
}
