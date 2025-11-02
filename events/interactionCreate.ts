import { CommandInteraction, Events } from 'discord.js';
import { ClientWithExtendedTypes } from '../types/types';
const commandInteraction = {
  name: Events.InteractionCreate,
  once: false,
  async execute(client: ClientWithExtendedTypes, PREFIX: string, interaction: CommandInteraction) {
    if (interaction.commandName === 'dummy_command') {
      return await interaction.reply('Thank you!');
    }
  },
};

export default commandInteraction;
