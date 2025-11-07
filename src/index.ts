import { Client, REST, Collection, GatewayIntentBits, Routes } from 'discord.js';
import botConfigs from './config';
import path from 'node:path';
import { readdirSync } from 'fs';
import { pathToFileURL } from 'node:url';
import { ClientWithExtendedTypes } from './types/types';
import ms from 'ms';

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessageReactions,
  ],
});

const interactionCommands: object[] = [];
const PREFIX = ['!mafia'];
// We decide typescript's to initialize our client with it's states
(client as ClientWithExtendedTypes).messageCommands = new Collection();
(client as ClientWithExtendedTypes).interactionCommands = new Collection();
(client as ClientWithExtendedTypes).playerManagers = new Collection();
(client as ClientWithExtendedTypes).lobbyManagers = new Collection();
(client as ClientWithExtendedTypes).gameManagers = new Collection();
(client as ClientWithExtendedTypes).gameThreads = new Collection();

// This function would be used to load all our commands recursively.

async function loadAllEvents(client: Client) {
  const eventDirectory = readdirSync(pathToFileURL(path.join(__dirname, 'events')));
  for (const event of eventDirectory) {
    const obj = await import(pathToFileURL(path.join(__dirname, 'events', event)).href);
    const {
      default: { once, execute, name },
    } = obj;
    if (once) {
      client.once(name, (...args) => execute(...args));
    } else {
      try {
        client.on(name, (...args) => execute(client, PREFIX, ...args));
      } catch (err) {
        console.log(err);
      }
    }
  }
}

async function loadAllCommands(cmdDir: string, type: 'message' | 'interaction' | 'any') {
  const commandDirectory = readdirSync(pathToFileURL(cmdDir), { withFileTypes: true });

  for (const command of commandDirectory) {
    const fullPath = pathToFileURL(path.join(cmdDir, command.name));

    if (command.isDirectory()) {
      if (command.name.includes('interaction')) {
        await loadAllCommands(path.join(cmdDir, command.name), 'interaction');
        continue;
      }
      await loadAllCommands(path.join(cmdDir, command.name), 'message');
      continue;
    }

    const obj = await import(fullPath.href);
    const {
      default: { name, description, execute },
    } = obj;

    if (!name || !description || !execute) {
      console.log(
        `
Sorry a command file found couldn't be loaded due to missing fields.
Name: ${name}, 
desc: ${description}, 
exec: ${execute ? 'defined' : 'undefined'}
        `,
      );
      continue;
    }

    if (type === 'interaction') {
      (client as ClientWithExtendedTypes).interactionCommands.set(name, {
        description,
        execute,
      });
      interactionCommands.push(obj.default);
    } else {
      (client as ClientWithExtendedTypes).messageCommands.set(name, { description, execute });
    }

    console.log(`
Command: ${name} was loaded successfully!
Type: ${type} command
Description: ${description}
      `);
  }
}

await loadAllEvents(client).catch(console.error);
await loadAllCommands(path.join(__dirname, 'commands'), 'any');

const rest = new REST().setToken(botConfigs.env.bot.token);
rest
  .put(Routes.applicationGuildCommands(botConfigs.env.bot.clientId, botConfigs.env.supportGuild.guildId), {
    body: interactionCommands,
  })
  .catch((err) => {
    console.error(err);
  });

client.login(botConfigs.env.bot.token).catch((err) => {
  console.error('Error occurred while signing in', err);
  console.log('Retrying in 30 seconds...');
  setTimeout(() => client.login(botConfigs.env.bot.token), ms('30s'));
});
