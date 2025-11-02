import { Client, EmbedBuilder } from 'discord.js';
import { HELP_EMBED_DESCRIPTION_MD } from '../../../constants/md/help';

export class CHelpEmbed {
  private client: Client;

  constructor(client: Client) {
    this.client = client;
  }

  public getEmbed = async () =>
    new EmbedBuilder()
      .setTitle('General Help')
      .setDescription(HELP_EMBED_DESCRIPTION_MD)
      .setTimestamp()
      .setThumbnail(this.client.user?.avatarURL() ?? '');
}
