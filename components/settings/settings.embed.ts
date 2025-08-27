import { Client, EmbedBuilder } from 'discord.js';
import { HELP_SETTINGS_DESCRIPTION } from '../../constants/help/help.md';
import { SettingsManager } from '../../structures/settings/SettingsManager';

export abstract class HelpSettingsEmbedClass {
  public static embed = async (client: Client, settingsManager: SettingsManager) =>
    new EmbedBuilder()
      .setTitle('Channel Specific Settings')
      .setDescription(await HELP_SETTINGS_DESCRIPTION(settingsManager))
      .setTimestamp()
      .setThumbnail(client.user?.avatarURL() ?? '');
}
