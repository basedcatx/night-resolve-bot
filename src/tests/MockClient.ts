import { Client, GatewayIntentBits } from 'discord.js';
import botConfigs from '../config';

export class MockClient {
  private client: Client;

  constructor() {
    this.client = new Client({
      intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.GuildMembers],
    });
  }

  async login(): Promise<Client> {
    await this.client.login(botConfigs.env.bot.token);
    return this.client;
  }
}
