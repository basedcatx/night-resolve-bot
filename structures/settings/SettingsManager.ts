import { db } from '../../database';
import GuildSettingsSchema from '../../database/schemas/GuildChannelSettingsSchema';
import { GuildChannelConfig } from '../../types/types';
import { GAME_GUILD_SETTINGS_DEFAULTS } from '../../constants/constants';
import { eq, InferSelectModel } from 'drizzle-orm';
import { PostgresError } from 'postgres';

export class SettingsManager {
  // please note that although it is called guild config i decided that every config should be unique per channel, so it's more of a channel config. I would change this in my database. This would help for private lobbies.
  private guildConfig: GuildChannelConfig = GAME_GUILD_SETTINGS_DEFAULTS;
  private guildId: string;

  constructor(guildId: string) {
    this.guildId = guildId;
    this.loadFromDb().then((r) => r);
  }

  private async loadFromDb() {
    const obj: InferSelectModel<typeof GuildSettingsSchema> | undefined = (
      await db.select().from(GuildSettingsSchema).where(eq(GuildSettingsSchema.id, this.guildId)).limit(1)
    )[0];

    if (obj?.config) {
      this.guildConfig = obj.config;
    } else {
      this.guildConfig = GAME_GUILD_SETTINGS_DEFAULTS;
      try {
        await db.insert(GuildSettingsSchema).values({
          id: this.guildId,
          config: this.guildConfig,
        });
      } catch (err) {
        if (err instanceof PostgresError) {
          console.error('An error occurred in settings manager, when creating a new guild settings', err);
        }
      }
    }
  }

  private async updateDb() {
    await db.update(GuildSettingsSchema).set({ config: this.guildConfig, updatedAt: new Date() });
  }

  set adminRoles(role: string[]) {
    this.guildConfig.initiators = [...role];
    this.updateDb().then((r) => r);
  }

  get adminRoles() {
    return this.guildConfig.initiators;
    this.updateDb().then((r) => r);
  }

  set minimumPlayers(min: number) {
    this.guildConfig.min = min;
    this.updateDb().then((r) => r);
  }

  set maximumPlayers(max: number) {
    this.guildConfig.max = max;
    this.updateDb().then((r) => r);
  }

  get minimumPlayers() {
    return this.guildConfig.min;
  }

  get maximumPlayers() {
    return this.guildConfig.max;
  }

  set dayDuration(durationInMs: number) {
    this.guildConfig.day = durationInMs;
    this.updateDb().then((r) => r);
  }

  set nightDuration(durationInMs: number) {
    this.guildConfig.night = durationInMs;
    this.updateDb().then((r) => r);
  }

  get dayDurationInMs() {
    return this.guildConfig.day;
  }

  get nightDurationInMs() {
    return this.guildConfig.night;
  }

  set revealRolesImmediatelyOnDeath(value: boolean) {
    this.guildConfig.reveal = value;
    this.updateDb().then((r) => r);
  }

  get revealRolesImmediatelyOnDeath() {
    return this.guildConfig.reveal;
  }

  set skipVoteAllowed(value: boolean) {
    this.guildConfig.skip = value;
    this.updateDb().then((r) => r);
  }

  get skipVoteAllowed() {
    return this.guildConfig.skip;
  }

  set hardcoreMode(value: boolean) {
    this.guildConfig.hardcore = value;
    this.updateDb().then((r) => r);
  }

  get hardcoreMode() {
    return this.guildConfig.hardcore;
  }

  set allowSpectators(value: boolean) {
    this.guildConfig.spectators = value;
    this.updateDb().then((r) => r);
  }

  get allowSpectators() {
    return this.guildConfig.spectators;
  }

  get gameTheme() {
    return this.guildConfig.theme;
  }
}
