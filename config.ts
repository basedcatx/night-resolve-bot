import { configDotenv } from 'dotenv';
import path from 'node:path';

// This is not the main file, just an way to organize my env files

configDotenv({
  path: path.join(__dirname, '.env'),
});

const botConfigs = {
  env: {
    bot: {
      token: process.env.BOT_API_TOKEN!,
      clientId: process.env.BOT_CLIENT_ID!,
    },
    db: {
      url: process.env.DATABASE_URL!,
      pool_url: process.env.DATABASE_POOL_URL!,
    },
    supportGuild: {
      guildId: process.env.SUPPORT_GUILD_ID!,
    },
  },
};

export default botConfigs;
