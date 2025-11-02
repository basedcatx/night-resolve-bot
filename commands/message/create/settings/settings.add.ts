import { SETTINGS, SETTINGS_COMMANDS, TIMEOUTS } from '../../../../constants/constants';
import { Message, Role } from 'discord.js';
import { ClientWithExtendedTypes } from '../../../../types/types';
import { SettingsManager } from '../../../../classes/SettingsManager';
import GetAllMentionedUsers from '../../../../utils/command_parsers/GetAllMentionedRoles';
import ArgTokenizer from '../../../../utils/command_parsers/ArgTokenizer';
import GetAllMentionedRoles from '../../../../utils/command_parsers/GetAllMentionedRoles';

const command = {
  name: SETTINGS_COMMANDS.SETTINGS_ADD.NAME,
  description: SETTINGS_COMMANDS.SETTINGS_ADD.DESCRIPTION,
  cooldown: TIMEOUTS.DEFAULT_TIMEOUT,
  execute: async function (client: ClientWithExtendedTypes, msg: Message) {
    const msgTokens = ArgTokenizer(msg);
    if (msgTokens.length < 5) {
      return console.log('Invalid args provided');
    }

    const mentionedUserIds = GetAllMentionedUsers(msgTokens);
    const mentionedRoles = GetAllMentionedRoles(msgTokens);
    console.log(mentionedUserIds);
    console.log(mentionedRoles);
    const settingsManager = new SettingsManager(msg.channelId);
    const option = msgTokens[3].trim();

    switch (option) {
      case SETTINGS.ADMIN_ROLES: {
        const validRoles = [];
        for (const role of mentionedRoles) {
          if (msg.guild?.roles.cache.find((r: Role) => r.id === role)) {
            validRoles.push(role);
          }
        }

        if (validRoles.length < 1) {
          return await msg.reply('Invalid roles specified');
        }

        settingsManager.setAdminRoles([...(await settingsManager.getAdminRoles()), ...validRoles]);
        await msg.reply('Sucessfully added as admins');
        // send back a response indicating it was done.
        break;
      }
    }
  },
};

export default command;
