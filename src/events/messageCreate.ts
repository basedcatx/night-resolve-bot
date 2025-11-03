import { Events, Message } from 'discord.js';
import { ClientWithExtendedTypes } from '../types/types';
import { message_command_tokenizer } from '../utils/command_parser';

const messageCreate = {
  name: Events.MessageCreate,
  once: false,
  execute: async function (client: ClientWithExtendedTypes, prefix: string[], msg: Message) {
    if (msg.author.bot) return;

    const msgTokens = message_command_tokenizer(msg.content);
    if (!msgTokens[0] || !prefix.includes(msgTokens[0])) return;

    // Get the command name (second token after prefix)
    const commandName = msgTokens[1];
    if (!commandName) return;

    console.log(commandName);

    // Try to execute the command if it exists
    const command = client.messageCommands.get(commandName);
    if (!command) {
      console.log(`Command not found: ${commandName}`);
      return;
    }

    try {
      await command.execute(client, msg);
    } catch (error) {
      console.error(`Error executing command ${commandName}:`, error);
      await msg.reply('There was an error executing that command.');
    }
  },
};

export default messageCreate;
