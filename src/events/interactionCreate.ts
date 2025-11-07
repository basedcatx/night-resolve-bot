import { CommandInteraction, Events } from 'discord.js';
import { ClientWithExtendedTypes } from '../types/types';
import { log } from '../utils/logger';
const commandInteraction = {
  name: Events.InteractionCreate,
  once: false,
  async execute(client: ClientWithExtendedTypes, PREFIX: string, interaction: CommandInteraction) {
    const command = client.interactionCommands.get(interaction.commandName);
    if (command) {
      await command.execute(client, interaction);
    } else {
      log.error('Command is undefined', {
        name: interaction.commandName,
        type: interaction.commandType,
        id: interaction.commandId,
      });
    }
  },
};

export default commandInteraction;
