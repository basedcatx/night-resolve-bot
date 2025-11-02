import { test, expect } from 'bun:test';
import { ChannelFactory } from '../../../classes/managers/ChannelFactory';
import { botClient } from '../../..';
import { ThreadChannelManager } from '../../../classes/managers/ThreadChannelManager';
import { TextChannelManager } from '../../../classes/managers/TextChannelManager';
import { VoiceChannelManager } from '../../../classes/managers/VoiceChannelManager';
import botConfigs from '../../../config';
import { error } from 'console';

await botClient.login(botConfigs.env.bot.token);

botClient.on('clientReady', async function exec() {
  test('Creates an instance of a ChannelManagerContract interface', function check() {
    const baseChannel = ChannelFactory.fromId('xxx', botClient);
    expect(baseChannel).not.toBeUndefined();
    expect(baseChannel?.type).not.toBeUndefined();
  });

  test("Creates an instance of a ChannelManager Object, from the channel factory's fromId() method, and checks if it is an instance of a TextChannelManager, VoiceChannelManager or ThreadChannelManager", async function check() {
    const channel = ChannelFactory.fromId('xxx', botClient); // would be replaced with my main channel's id, once i set up my env
    expect(channel).not.toBeUndefined();
    expect(channel).toBeInstanceOf(ThreadChannelManager || TextChannelManager || VoiceChannelManager);
  });
});

botClient.on('error', function () {
  console.error(error);
});
