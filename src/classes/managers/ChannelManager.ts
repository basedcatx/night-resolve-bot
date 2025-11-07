import { ChannelType, Client, GuildChannel, PermissionsBitField, TextChannel, ThreadAutoArchiveDuration } from 'discord.js';
import { IChannelManager } from './interfaces';

export class ChannelManager implements IChannelManager {
  private readonly channel: GuildChannel;

  constructor(channel: GuildChannel) {
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

  public getGuildChannel() {
    return this.channel;
  }

  public async postSystemMessage(content: string): Promise<void> {
    const formattedContent = `[SYSTEM ALERT] - ${content}`;
    if (this.channel.isSendable()) await this.channel.send({ content: formattedContent });
  }

  public isPostable(): boolean {
    return this.channel.isSendable();
  }

  public hasThreadPermission(bot: Client): boolean {
    const botMember = this.channel.members.get(bot.user?.id ?? '');
    if (botMember == undefined) throw new Error('Bot is not part of this server');
    return this.channel
      .permissionsFor(botMember)
      .has([
        PermissionsBitField.Flags.CreatePublicThreads,
        PermissionsBitField.Flags.CreatePrivateThreads,
        PermissionsBitField.Flags.SendMessagesInThreads,
        PermissionsBitField.Flags.ManageThreads,
      ]);
  }

  public async createThread(id: string, type: ChannelType.PrivateThread | ChannelType.PublicThread) {
    if (!this.supportThreads()) return undefined;

    const thread = await (this.channel as TextChannel).threads.create({
      name: `Game - ${id}`,
      type,
      reason: 'The space for every contender to meet their doom!',
      autoArchiveDuration: ThreadAutoArchiveDuration.OneDay,
    });

    await thread.join();
    return thread;
  }

  public supportThreads() {
    return this.channel.isTextBased();
  }
}
