import { Message } from 'discord.js';
import { TIMEOUTS } from '../../../../constants/constants';
import { HelpSettingsEmbedClass } from '../../../../components/settings/settings.embed';
import { SettingsManager } from '../../../../structures/settings/SettingsManager';
import ArgTokenizer from '../../../../utils/ArgTokenizer';
import { ClientWithExtendedTypes } from '../../../../types/types';
import { SETTINGS_COMMANDS } from '../../../../constants/commands/settings.command.constants';

const command = {
  name: SETTINGS_COMMANDS.SETTINGS.NAME,
  description: SETTINGS_COMMANDS.SETTINGS.DESCRIPTION,
  cooldown: TIMEOUTS.HELP_TIMEOUT,
  async execute(client: ClientWithExtendedTypes, msg: Message) {
    const msgTokens = ArgTokenizer(msg);
    const redirectCommandIndex = msgTokens.indexOf(SETTINGS_COMMANDS.SETTINGS.NAME);
    // To avoid recursion we check if the prefix tokens are more than 2 eg !mafia settings add
    const redirectCommand =
      msgTokens.length < 3 ? null : client.messageCommands.get(msgTokens.splice(1, redirectCommandIndex + 1).join(' '));

    if (redirectCommand) {
      return redirectCommand.execute(client, msg);
    }

    msg.reply({
      embeds: [HelpSettingsEmbedClass.embed(client, new SettingsManager(msg.channelId))],
    });
  },
};

export default command;
