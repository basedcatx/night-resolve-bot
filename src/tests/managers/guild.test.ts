import { test, expect } from 'bun:test';
import { GuildManager } from '../../classes/managers/GuildManager';
import botConfigs from '../../config';
import { MockClient } from '../MockClient';

const client = await new MockClient().login();
client.on('clientReady', async function exec() {
  test('Verifies that a new guild object is created and could be used to retrieve an instanciated guild name and id', async function () {
    const guild = GuildManager.fromId(botConfigs.env.supportGuild.guildId, client);
    expect(guild).toBeInstanceOf(GuildManager);
    expect(typeof guild?.name).toBe('string');
    expect(typeof guild?.id).toBe('string');
  });
});
