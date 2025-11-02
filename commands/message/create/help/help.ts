import { Message } from 'discord.js';
import { HELP_COMMANDS, TIMEOUTS } from '../../../../constants/constants';
import ArgTokenizer from '../../../../utils/command_parsers/ArgTokenizer';
import { ClientWithExtendedTypes } from '../../../../types/types';
import { CHelpEmbed } from '../../../../components/embeds/help/HelpEmbed';

const help = {
  name: HELP_COMMANDS.HELP.NAME,
  description: HELP_COMMANDS.HELP.DESCRIPTION,
  cooldown: TIMEOUTS.DEFAULT_TIMEOUT,
  async execute(client: ClientWithExtendedTypes, msg: Message) {
    const msgTokens = ArgTokenizer(msg);
    const redirectCommandIndex = msgTokens.indexOf(HELP_COMMANDS.HELP.NAME);
    // To avoid recursion we check if the prefix tokens are more than 2 eg !mafia settings add
    const redirectCommand =
      msgTokens.length < 3 ? null : client.messageCommands.get(msgTokens.splice(1, redirectCommandIndex + 1).join(' '));
    const cHelpEmbed = new CHelpEmbed(client);

    if (redirectCommand) {
      return redirectCommand.execute(client, msg);
    }

    console.log(client.user?.tag, msg.author.avatar);
    msg.reply({
      embeds: [await cHelpEmbed.getEmbed()],
    });
  },
};

export default help;
