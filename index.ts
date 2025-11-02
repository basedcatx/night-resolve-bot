import { Client, REST, Collection, CommandInteraction, GatewayIntentBits, SlashCommandBuilder, Routes } from 'discord.js';
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
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers,
  ],
});

// Dummy slash command, to keep my active developer badge

const dummy_commands = {
  data: new SlashCommandBuilder()
    .setName('dummy_command')
    .setDescription('This command is just to make sure i can retain my active developer role'),
  async execute(interaction: CommandInteraction) {
    await interaction.reply('Hello world, nice to see you.');
  },
};

const commands = [{ ...dummy_commands.data.toJSON() }];

const PREFIX = '!mafia';

// We decide typescript's to initialize our client with it's states
(client as ClientWithExtendedTypes).messageCommands = new Collection();

// we need to read through all the events and the once which are once, init them, once which are on, init them.
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

    (client as ClientWithExtendedTypes).messageCommands.set(name, {
      description,
      execute,
    });

    console.log(`
Command: ${name} was loaded successfully!
Description: ${description}
      `);
  }
}

loadAllEvents(client).catch(console.error);
loadAllCommands(path.join(__dirname, 'commands'))
  .then((r) => r)
  .catch(console.error);
const rest = new REST().setToken(botConfigs.env.bot.token);
rest
  .put(Routes.applicationGuildCommands(botConfigs.env.bot.clientId, botConfigs.env.supportGuild.guildId), {
    body: commands,
  })
  .catch((err) => {
    console.error(err);
  });
client.login(botConfigs.env.bot.token).catch((err) => {
  console.error('Error occurred while signing in', err);
  console.log('Retrying in 30 seconds...');
  setTimeout(() => client.login(botConfigs.env.bot.token), ms('30s'));
});

export const botClient = client;
