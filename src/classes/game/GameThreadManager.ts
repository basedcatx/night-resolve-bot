/*
 * This class has nothing to deal with multi-threading.
 * Discord has this in-channel threads where you can diverge with specific discussions, not to flood the main chat.
 * We leverage this feature to create different game threads per lobby.
 */

import { ChannelType, PrivateThreadChannel, PublicThreadChannel, TextChannel } from 'discord.js';
import { PlayerManager } from './PlayerManager';
import { MAX_PLAYER_IN_GAME } from '../../types/globals';
import { GameThreadManagerError } from '../../errors/GameThreadManagerError';
import { GAME_THREAD_STATES } from '../../types/states';
import { ChannelManager } from '../managers/ChannelManager';
import { ClientWithExtendedTypes, Result } from '../../types/types';

export class GameThreadManager {
  // Threads are sub-channels, so every channel can have it's own individual list of threads.
  private threadId: string;
  private thread: PrivateThreadChannel | PublicThreadChannel | undefined;
  private players: PlayerManager[] = [];
  private state: GAME_THREAD_STATES = 'und';

  constructor(id: string) {
    this.threadId = id;
  }

  public async createThread(id: string, channel: ChannelManager, client: ClientWithExtendedTypes): Promise<Result<boolean>> {
    // We already made sure to check this from our ChannelManagerClass, so it would be impossible for it not to be a TextChannel

    const thread = await (channel.getGuildChannel() as TextChannel).threads.create({
      name: `GAME - #${id}`,
      type: ChannelType.PublicThread,
    });

    if (!thread)
      return {
        ok: false,
        error: new GameThreadManagerError(
          "This current channel doesn't support threads, or i wasn't granted permissions to create and manage threads :( please contact your server admininstrator to re-install me to the server, but if this persists, please report to the developers.",
          'GAME_CANNOT_CREATE_THREAD_ERROR',
          {
            channelId: channel.id,
            hasThreadPermissions: channel.hasThreadPermission(client),
            type: 'user',
          },
        ),
      };

    this.thread = thread;
    this.state = 'init';
    return { ok: true, value: true };
  }

  public addPlayer(player: PlayerManager): Result<void> {
    if (this.players.length >= MAX_PLAYER_IN_GAME)
      return {
        ok: false,
        error: new GameThreadManagerError("Maximum player's reach for the queued game", 'GAME_MAX_PLAYER_ERROR', {
          count: this.players.length,
          type: 'user',
          players: this.players,
        }),
      };

    if (this.players.find((p) => p.id === player.id)) {
      return {
        ok: false,
        error: new GameThreadManagerError('You have already been queued for this game', 'GAME_PLAYER_ALREADY_IN_QUEUE', {
          type: 'user',
        }),
      };
    }

    if (!(this.state === 'init' || this.state === 'und')) {
      return {
        ok: false,
        error: new GameThreadManagerError('You cannot join while this game is ongoing', 'GAME_ONGOING', {
          state: this.state,
          type: 'sys',
          players: this.players,
        }),
      };
    }

    this.players.push(player);
    return { ok: true };
  }

  public removePlayer(player: PlayerManager): Result<void> {
    if (!this.players.find((p) => p.id === player.id)) {
      return {
        ok: false,
        error: new GameThreadManagerError('You were not in this queue.', 'GAME_PLAYER_NOT_IN_QUEUE', {
          type: 'user',
          player,
          players: this.players,
        }),
      };
    }

    if (!(this.state === 'init' || this.state === 'und')) {
      return {
        ok: false,
        error: new GameThreadManagerError('You cannot remove a player while the game is ongoing', 'GAME_ONGOING', {
          state: this.state,
          type: 'sys',
          players: this.players,
        }),
      };
    }

    this.players = this.players.filter((p) => p.id !== player.id);
    return { ok: true };
  }

  public getPlayers() {
    return this.players;
  }

  public countPlayers() {
    return this.players.length;
  }

  private async initialize() {
    if (this.thread == undefined) return;
    await this.thread.setLocked(true);
    // So it makes sense to initialize a thread with the list of all the game's players.
    // We need to add all members to the thread here.
    // We have to mute every other person.
    // Only users who have a role should be alowed to play (allowed to send messages in the thread.)
  }

  async postSystemMessage(content: string) {
    /*
     * I can't get my head around this now, so i would skip it
     */
  }

  //
}
