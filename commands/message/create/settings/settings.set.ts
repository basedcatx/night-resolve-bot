import { SETTINGS, SETTINGS_COMMANDS, TIMEOUTS } from '../../../../constants/constants';
import { Message, Role } from 'discord.js';
import { ClientWithExtendedTypes } from '../../../../types/types';
import { SettingsManager } from '../../../../classes/SettingsManager';
import ArgTokenizer from '../../../../utils/command_parsers/ArgTokenizer';
import GetAllMentionedRoles from '../../../../utils/command_parsers/GetAllMentionedRoles';

const command = {
  name: SETTINGS_COMMANDS.SETTINGS_SET.NAME,
  description: SETTINGS_COMMANDS.SETTINGS_SET.DESCRIPTION,
  cooldown: TIMEOUTS.DEFAULT_TIMEOUT,
  execute: async function (client: ClientWithExtendedTypes, msg: Message) {
    const msgTokens = ArgTokenizer(msg);

    if (msgTokens.length < 5) {
      return console.log('Invalid args provided');
    }

    const mentionedRoles = GetAllMentionedRoles(msgTokens);
    const settingsManager = new SettingsManager(msg.channelId);
    const option = msgTokens[3].trim();
    const value = msgTokens[4].trim();

    switch (option) {
      case SETTINGS.ADMIN_ROLES: {
        if (mentionedRoles.length < 1) return await msg.reply('Invalid arguments passed.');

        for (const role of mentionedRoles) {
          const r = msg.guild?.roles.cache.find((r: Role) => r.id === role);
          if (r) {
            settingsManager.setAdminRoles([r.name]);
            break;
          }
        }

        await msg.reply('Sucessfully added as admins');
        // send back a response indicating it was done.
        break;
      }

      case SETTINGS.MIN_PLAYERS: {
        try {
          const v = Math.floor(Number(value));
          if (v < 5) {
            throw new Error('Minimum players cannot be less than 5', {
              cause: 'value-less-than-5',
            });
          }
          settingsManager.setMinimumPlayers(v);
          await msg.reply(`Successfully set minimum players to: ${v}`);
        } catch (e) {
          if (e instanceof ReferenceError) {
            /// Tell the user an invalid value was inputted
            return await msg.reply('Invalid value, please specify a whole number, greater than 5');
          }

          if (e instanceof Error) {
            if (e.cause === 'value-less-than-5') {
              return await msg.reply(e.message);
            }
          }

          console.log(e);
          return await msg.reply('Something unexpected happened, please report to the developer');
        }

        break;
      }

      case SETTINGS.MAX_PLAYERS: {
        try {
          const v = Math.floor(Number(value));
          if (v < 5) {
            throw new Error('Maximum players cannot be less than 5', {
              cause: 'value-less-than-5',
            });
          }
          settingsManager.setMaximumPlayers(v);
          await msg.reply(`Successfully set maximum players to: ${v}`);
        } catch (e) {
          if (e instanceof ReferenceError) {
            /// Tell the user an invalid value was inputted
            return await msg.reply('Invalid value, please specify a whole number, greater than 5');
          }

          if (e instanceof Error) {
            if (e.cause === 'value-less-than-5') {
              return await msg.reply(e.message);
            }
          }

          console.log(e);
          return await msg.reply('Something unexpected happened, please report to the developer');
        }

        break;
      }

      case SETTINGS.ALLOW_SPECTATORS: {
        const v = Boolean(value);
        await settingsManager.setAllowSpectators(v);
        return await msg.reply(`Sucessfully set 'allow spectators': ${v}`);
      }

      case SETTINGS.PHASE_DURATION: {
        try {
          const v = Math.floor(Number(value));
          if (v < 60) {
            throw new Error('Phase duration cannot be less than a minute');
          }
        } catch (error) {
          if (error instanceof ReferenceError) {
            return await msg.reply('Invalid type passed, must be a number');
          }
          if (error instanceof Error) {
            return await msg.reply(error.message);
          }

          console.error(error);
          return await msg.reply('Something unexpected occurred, please report to the developer');
        }
      }
    }
  },
};

export default command;
