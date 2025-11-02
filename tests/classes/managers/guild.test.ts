import { test, expect } from 'bun:test';
import { botClient } from '../../..';
import { GuildManager } from '../../../classes/managers/GuildManager';
import botConfigs from '../../../config';

await botClient.login(botConfigs.env.bot.token);

botClient.on('clientReady', async function exec() {
  test('Verifies that a new guild object is created and could be used to retrieve an instanciated guild name and id', async function () {
    const guild = GuildManager.fromId(botConfigs.env.supportGuild.guildId, botClient);
    expect(guild).toBeInstanceOf(GuildManager);
    expect(typeof guild?.name).toBe('string');
    expect(typeof guild?.id).toBe('string');
  });
});
