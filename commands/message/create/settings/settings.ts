import { Message } from 'discord.js';
import { SETTINGS_COMMANDS, TIMEOUTS } from '../../../../constants/constants';
import { HelpSettingsEmbedClass } from '../../../../components/settings/settings.embed';
import { SettingsManager } from '../../../../structures/settings/SettingsManager';
import ArgTokenizer from '../../../../utils/ArgTokenizer';
import { ClientWithExtendedTypes } from '../../../../types/types';

const command = {
  name: SETTINGS_COMMANDS.SETTINGS.NAME,
  description: SETTINGS_COMMANDS.SETTINGS.DESCRIPTION,
  cooldown: TIMEOUTS.DEFAULT_TIMEOUT,
  async execute(client: ClientWithExtendedTypes, msg: Message) {
    const msgTokens = ArgTokenizer(msg);
    const redirectCommandIndex = msgTokens.indexOf(SETTINGS_COMMANDS.SETTINGS.NAME);
    const settingsCommand = msgTokens.splice(redirectCommandIndex, 2).join(' ').trim(); // we join with an empty space, so that it forms a string
    // To avoid recursion we check if the prefix tokens are more than 2 eg !mafia settings add
    const redirectCommand = msgTokens.length < 3 ? null : client.messageCommands.get(settingsCommand);
    for (const [name, obj] of client.messageCommands) {
      console.log(name, obj);
    }

    if (redirectCommand) {
      return redirectCommand.execute(client, msg);
    }

    return msg.reply({
      embeds: [await HelpSettingsEmbedClass.embed(client, new SettingsManager(msg.channelId))],
    });
  },
};

export default command;
