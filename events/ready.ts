import { Client } from 'discord.js';

const ready = {
  name: 'clientReady',
  once: true,
  async execute(client: Client) {
    console.log('Client is ready', client.user?.displayName);
  },
};

export default ready;
