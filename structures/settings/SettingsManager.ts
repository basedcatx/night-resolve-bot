import { db } from '../../database';
import GuildSettingsSchema from '../../database/schemas/GuildChannelSettingsSchema';
import { GuildChannelConfig } from '../../types/types';
import { GAME_GUILD_SETTINGS_DEFAULTS } from '../../constants/constants';
import { eq, InferSelectModel } from 'drizzle-orm';
import { PostgresError } from 'postgres';

export class SettingsManager {
  // please note that although it is called guild config i decided that every config should be unique per channel, so it's more of a channel config. I would change this in my database. This would help for private lobbies.
  private channelConfigs: GuildChannelConfig = GAME_GUILD_SETTINGS_DEFAULTS;
  private channelId: string;

  constructor(channelId: string) {
    this.channelId = channelId;
    this.loadFromDb().then((r) => r);
  }

  private async loadFromDb() {
    const obj: InferSelectModel<typeof GuildSettingsSchema> | undefined = (
      await db.select().from(GuildSettingsSchema).where(eq(GuildSettingsSchema.id, this.channelId)).limit(1)
    )[0];

    if (obj?.config) {
      this.channelConfigs = obj.config;
    } else {
      this.channelConfigs = GAME_GUILD_SETTINGS_DEFAULTS;
      try {
        await db.insert(GuildSettingsSchema).values({
          id: this.channelId,
          config: this.channelConfigs,
        });
      } catch (err) {
        if (err instanceof PostgresError) {
          console.error('An error occurred in settings manager, when creating a new guild settings', err);
        }
      }
    }
  }

  private async updateDb() {
    await db
      .update(GuildSettingsSchema)
      .set({ config: this.channelConfigs, updatedAt: new Date() })
      .where(eq(GuildSettingsSchema.id, this.channelId));
  }

  async setAdminRoles(role: string[]) {
    this.channelConfigs.admin = [...role];
    await this.updateDb();
  }

  async getAdminRoles() {
    return this.channelConfigs.admin;
  }

  async setMaximumPlayers(max: number) {
    this.channelConfigs.max = max;
    this.updateDb().then((r) => r);
  }

  async getMinimumPlayers() {
    return this.channelConfigs.min;
  }

  async setMinimumPlayers(min: number = 5) {
    this.channelConfigs.min = min;
    await this.updateDb();
  }

  async getMaximumPlayers() {
    return this.channelConfigs.max;
  }

  async setPhaseChangeDuration(durationInSec = 20) {
    this.channelConfigs.duration = durationInSec;
    await this.updateDb();
  }

  async getPhaseChangeDuration() {
    return this.channelConfigs.duration;
  }

  async setRevealRolesImmediatelyOnDeath(value: boolean = true) {
    this.channelConfigs.reveal = value;
    await this.updateDb();
  }

  async getRevealRolesImmediatelyOnDeath() {
    return this.channelConfigs.reveal;
  }

  async setSkipVoteAllowed(value: boolean = false) {
    this.channelConfigs.skip = value;
    await this.updateDb();
  }

  async getSkipVoteAllowed() {
    return this.channelConfigs.skip;
  }

  async setHardcoreMode(value: boolean = false) {
    this.channelConfigs.hardcore = value;
    await this.updateDb();
  }

  async getHardcoreMode() {
    return this.channelConfigs.hardcore;
  }

  async setAllowSpectators(value: boolean = true) {
    this.channelConfigs.spectators = value;
    await this.updateDb();
  }

  async getAllowSpectators() {
    return this.channelConfigs.spectators;
  }

  async getGameTheme() {
    return this.channelConfigs.theme;
  }

  // TODO: Add more game themes, but that's in future, if the project is really loved.
}
