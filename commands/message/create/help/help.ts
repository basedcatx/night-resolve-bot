import { Message } from 'discord.js';
import { TIMEOUTS } from '../../../../constants/constants';
import { HelpEmbedClass } from '../../../../components/help/help.embed';
import ArgTokenizer from '../../../../utils/ArgTokenizer';
import { HELP_COMMANDS } from '../../../../constants/commands/help.command.constants';
import { ClientWithExtendedTypes } from '../../../../types/types';

const help = {
  name: HELP_COMMANDS.HELP.NAME,
  description: HELP_COMMANDS.HELP.DESCRIPTION,
  cooldown: TIMEOUTS.HELP_TIMEOUT,
  async execute(client: ClientWithExtendedTypes, msg: Message) {
    const msgTokens = ArgTokenizer(msg);
    const redirectCommandIndex = msgTokens.indexOf(HELP_COMMANDS.HELP.NAME);
    // To avoid recursion we check if the prefix tokens are more than 2 eg !mafia settings add
    const redirectCommand =
      msgTokens.length < 3 ? null : client.messageCommands.get(msgTokens.splice(1, redirectCommandIndex + 1).join(' '));

    if (redirectCommand) {
      return redirectCommand.execute(client, msg);
    }

    console.log(client.user?.tag, msg.author.avatar);
    msg.reply({
      embeds: [HelpEmbedClass.embed(client)],
    });
  },
};

export default help;
