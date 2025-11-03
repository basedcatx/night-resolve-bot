import { ChannelType, VoiceChannel } from 'discord.js';
import { IChannelManager } from './interfaces';

export class VoiceChannelManager implements IChannelManager {
  private readonly channel: VoiceChannel;

  constructor(channel: VoiceChannel) {
    this.channel = channel;
  }

  public get name(): string {
    return this.channel.name;
  }

  public get id(): string {
    return this.channel.id;
  }

  public get type(): ChannelType {
    return this.channel.type;
  }

  public async postSystemMessage(content: string): Promise<void> {
    await this.channel.send({ content }); /* Alot to work on later */
  }

  public isPostable(): boolean {
    return this.channel.isSendable();
  }
}
