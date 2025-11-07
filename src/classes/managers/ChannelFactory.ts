import { Client, GuildChannel } from 'discord.js';
import { IChannelManager } from './interfaces';
import { ChannelManager } from './ChannelManager';
import { Result } from '../../types/types';

/*
 * Finds a channel by ID and returns a specialized ChannelManagerContract Object wrapper, eg TextChannelManager
 */

export class ChannelFactory {
  private constructor() {}

  /*
   * @returns ChannelManagerContract | undefined
   */
  public static fromId(channelId: string, client: Client): Result<IChannelManager> {
    const guildChannel = client.channels.cache.get(channelId);
    if (guildChannel == undefined) return { ok: false, error: new Error('guild channel is undefined') };
    if (!(guildChannel instanceof GuildChannel))
      return { ok: false, error: new Error('guild channel is not an instance of GuildChannel') };
    return { ok: true, value: new ChannelManager(guildChannel) };
  }
}
