import { Client, Guild } from 'discord.js';
import { GuildManagerContract } from './contracts/GuildManagerContract';

export class GuildManager implements GuildManagerContract {
  private readonly guild: Guild;

  private constructor(guild: Guild) {
    this.guild = guild;
  }

  public static fromId(guildId: string, client: Client): GuildManager {
    const guild = client.guilds.cache.get(guildId);
    if (guild == undefined)
      throw new Error("Guild not found in the client's cache. Are you sure this server has the client installed?");
    return new GuildManager(guild);
  }

  public get name(): string {
    return this.guild.name;
  }

  public get id(): string {
    return this.guild.id;
  }

  /*
   * Would have other methods like ban members, uhm and a lot of utilities i expect the guild manager to handle by default.
   */
}
