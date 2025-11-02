import { jsonb, pgTable, text, timestamp } from 'drizzle-orm/pg-core';
import { GuildChannelConfig } from '../../types/types';
import { GAME_GUILD_CHANNEL_SETTINGS_DEFAULTS } from '../../constants/constants';

const GuildSettingsSchema = pgTable('guild_channel_settings', {
  id: text('id').notNull().primaryKey(),
  config: jsonb('config').$type<GuildChannelConfig>().default(GAME_GUILD_CHANNEL_SETTINGS_DEFAULTS).notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
});

export default GuildSettingsSchema;
