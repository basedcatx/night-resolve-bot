import { Client, Message } from 'discord.js';
import { TIMEOUTS } from '../../../../constants/constants';

const help = {
  name: '!help',
  description: 'Generic command to display all general help options.',
  cooldown: TIMEOUTS.HELP_TIMEOUT,
  async execute(client: Client, msg: Message) {
    console.log(client.user?.tag, msg.author.avatar);
  },
};

export default help;
