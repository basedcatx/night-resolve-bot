import { EmbedBuilder } from 'discord.js';
import { SettingsManager } from '../../../classes/SettingsManager';
import { SETTINGS_EMBED_DESCRIPTION_MD } from '../../../constants/md/settings';

export class CSettingsEmbed {
  private settings_manager: SettingsManager;

  constructor(settings_manager: SettingsManager) {
    this.settings_manager = settings_manager;
  }

  public getEmbed = async () => {
    return new EmbedBuilder()
      .setTitle('Channel Settings')
      .setDescription(await SETTINGS_EMBED_DESCRIPTION_MD(this.settings_manager))
      .setTimestamp();
  };
}
