import { ChannelType, Client, TextChannel, ThreadChannel, VoiceChannel } from 'discord.js';
import { ChannelManagerContract } from './contracts/ChannelManagerContract';
import { TextChannelManager } from './TextChannelManager';
import { ThreadChannelManager } from './ThreadChannelManager';
import { VoiceChannelManager } from './VoiceChannelManager';

/*
 * Finds a channel by ID and returns a specialized ChannelManagerContract Object wrapper, eg TextChannelManager
 */

export class ChannelFactory {
  private constructor() {}

  /*
   * @returns ChannelManagerContract | undefined
   */
  public static fromId(channelId: string, client: Client): ChannelManagerContract | undefined {
    const guildChannel = client.channels.cache.get(channelId);
    if (guildChannel == undefined) return undefined;

    switch (guildChannel.type) {
      case ChannelType.GuildText: {
        return new TextChannelManager(guildChannel as TextChannel);
      }

      case ChannelType.PublicThread:
      case ChannelType.PrivateThread: {
        return new ThreadChannelManager(guildChannel as ThreadChannel);
      }

      case ChannelType.GuildVoice: {
        return new VoiceChannelManager(guildChannel as VoiceChannel);
      }
    }
  }
}
