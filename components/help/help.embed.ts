import { Client, EmbedBuilder } from 'discord.js';
import { HELP_EMBED_DESCRIPTION } from '../../constants/help/help.md';

export abstract class HelpEmbedClass {
  public static embed = (client: Client) =>
    new EmbedBuilder()
      .setTitle('GENERAL HELP')
      .setDescription(HELP_EMBED_DESCRIPTION)
      .setTimestamp()
      .setThumbnail(client.user?.avatarURL() ?? '');
}
