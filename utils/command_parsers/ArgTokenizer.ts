import { Message } from 'discord.js';

const ArgTokenizer = (message: Message): string[] => message.content.trim().split(' ');
export default ArgTokenizer;
