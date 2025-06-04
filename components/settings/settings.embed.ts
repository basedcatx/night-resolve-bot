import { Client, EmbedBuilder } from 'discord.js';
import { HELP_SETTINGS_DESCRIPTION } from '../../constants/help/help.md';
import { SettingsManager } from '../../structures/settings/SettingsManager';

export abstract class HelpSettingsEmbedClass {
  public static embed = (client: Client, settingsManager: SettingsManager) =>
    new EmbedBuilder()
      .setTitle('Guild Settings')
      .setDescription(HELP_SETTINGS_DESCRIPTION(settingsManager))
      .setTimestamp()
      .setThumbnail(client.user?.avatarURL() ?? '');
}
