import { Client, Message } from 'discord.js';
import ArgTokenizer from '../utils/ArgTokenizer';

const messageCreate = {
  name: 'messageCreate',
  prefix: '!mafia',
  once: false,
  async execute(client: Client, msg: Message) {
    if (msg.author.bot) return;
    const msgTokens = ArgTokenizer(msg);
    if (msgTokens[0] !== this.prefix) return;
  },
};

export default messageCreate;
