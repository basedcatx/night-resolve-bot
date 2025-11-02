import { ChannelType, TextChannel } from 'discord.js';
import { ChannelManagerContract } from './contracts/ChannelManagerContract';

export class TextChannelManager implements ChannelManagerContract {
  private readonly channel: TextChannel;

  constructor(channel: TextChannel) {
    this.channel = channel;
  }

  public get id(): string {
    return this.channel.id;
  }

  public get name(): string {
    return this.channel.name;
  }

  public get type(): ChannelType {
    return this.channel.type;
  }

  public async postSystemMessage(content: string): Promise<void> {
    const formattedContent = `[SYSTEM ALERT] - ${content}`;
    await this.channel.send({ content: formattedContent });
  }

  public isPostable(): boolean {
    return this.channel.isSendable();
  }
}
