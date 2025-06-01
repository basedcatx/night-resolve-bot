import { Client, Collection, GatewayIntentBits } from 'discord.js';
import botConfigs from './config';
import path from 'node:path';
import { readdirSync } from 'fs';
import { pathToFileURL } from 'node:url';
import { ClientWithExtendedTypes } from './types/types';

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

// We decide typescript's to initialize our client with it's states
(client as ClientWithExtendedTypes).messageCommands = new Collection();

// we need to read through all the events and the once which are once, init them, once which are on, init them.
async function loadEvents() {
  const eventDirectory = readdirSync(pathToFileURL(path.join(__dirname, 'events')));
  for (const event of eventDirectory) {
    const obj = await import(pathToFileURL(path.join(__dirname, 'events', event)).href);
    const {
      default: { once, execute, name },
    } = obj;
    if (once) {
      client.once(name, execute);
    } else {
      client.on(name, (interaction) => execute(client, interaction));
    }
  }
}

// This function would be used to load all our commands recursively.
async function loadAllCommands(cmdDir: string) {
  const commandDirectory = readdirSync(pathToFileURL(cmdDir), { withFileTypes: true });

  for (const command of commandDirectory) {
    const fullPath = pathToFileURL(path.join(cmdDir, command.name));

    if (command.isDirectory()) {
      await loadAllCommands(path.join(cmdDir, command.name));
      continue;
    }

    const obj = await import(fullPath.href);
    const {
      default: { name, description, execute },
    } = obj;

    if (!name || description || execute) {
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

    (client as ClientWithExtendedTypes).messageCommands.set(name, {
      name,
      description,
      execute,
    });

    console.log(`
Command: ${name} was loaded successfully!
Description: ${description}
      `);
  }
}

loadEvents().then((r) => r);
loadAllCommands(path.join(__dirname, 'commands')).then((r) => r);

client.login(botConfigs.env.bot.token);
