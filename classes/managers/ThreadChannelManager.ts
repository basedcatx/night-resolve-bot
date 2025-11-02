import { ChannelType, ThreadChannel } from 'discord.js';
import { ChannelManagerContract } from './contracts/ChannelManagerContract';

/*
 * Implementation of the channel wrapper for ThreadBasedChannels.
 * TODO: I have to add an auto archieve timeout to this. Would check that out later on.
 */

export class ThreadChannelManager implements ChannelManagerContract {
  private readonly channel: ThreadChannel;

  constructor(channel: ThreadChannel) {
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

  async postSystemMessage(content: string): Promise<void> {
    await this.channel.send({ content }); // I would leave this as a placeholder. With time we would have to expansiate on this and make it a lot better.
  }

  isPostable(): boolean {
    return this.channel.isSendable();
  }
}
