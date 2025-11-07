import { LobbyManagerError } from '../../errors/LobbyManagerError';
import { MAX_ACTIVE_GAME_THREADS_PER_CHANNEL } from '../../types/globals';
import { ClientWithExtendedTypes, Result } from '../../types/types';
import { ChannelFactory } from '../managers/ChannelFactory';
import { LOBBY_STATE_TYPE } from '../../types/states';
import { GameThreadManager } from './GameThreadManager';

export class LobbyManager {
  private readonly channelId: string;
  private threads: GameThreadManager[] = [];
  private state: LOBBY_STATE_TYPE = 'idle';

  constructor(channelId: string) {
    this.channelId = channelId;
  }

  public get id() {
    return this.channelId;
  }

  public setState(state: LOBBY_STATE_TYPE) {
    this.state = state;
  }

  public getState() {
    return this.state;
  }

  /* First we create the game thread, then we add all users to this game thread, by mentioning them in the private thread
   *
   */

  public async createGameThread(client: ClientWithExtendedTypes): Promise<Result<GameThreadManager>> {
    const channelManager = ChannelFactory.fromId(this.channelId, client);

    if (this.threads.length > MAX_ACTIVE_GAME_THREADS_PER_CHANNEL) {
      return {
        ok: false,
        error: new LobbyManagerError(
          'The maximum number of ongoing games (threads) for this channel has been exceeded, please consider switching to another channel, or ask your server administrator to add a new channel for the game',
          'LOBBY_MAX_ACTIVE_THREADS_ERROR',
          { id: this.channelId, threadCount: this.threads.length, type: 'user' },
        ),
      };
    }

    if (!channelManager)
      return {
        ok: false,
        error: new LobbyManagerError('Invalid Channel', 'LOBBY_INVALID_CHANNEL_ERROR', { id: this.channelId, type: 'sys' }),
      };

    const gameThreadManager = new GameThreadManager(this.threads.length.toString());

    client.gameThreads.set(this.channelId + this.threads.length, gameThreadManager);
    return { ok: true, value: gameThreadManager };
    // After the thread is created, we mute every server member in this thread when the game initializes we can then unmute just the required players.
  }

  /*
   * We should make sure the player doesn't belong to another lobby ie, he/she should have a state that isn't in_game.
   */
}
