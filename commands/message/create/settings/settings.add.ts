import { SETTINGS, SETTINGS_COMMANDS, TIMEOUTS } from '../../../../constants/constants';
import { Message } from 'discord.js';
import { ClientWithExtendedTypes } from '../../../../types/types';
import ArgTokenizer from '../../../../utils/ArgTokenizer';
import { SettingsManager } from '../../../../structures/settings/SettingsManager';

const command = {
  name: SETTINGS_COMMANDS.SETTINGS_ADD.NAME,
  description: SETTINGS_COMMANDS.SETTINGS_ADD.DESCRIPTION,
  cooldown: TIMEOUTS.DEFAULT_TIMEOUT,
  execute: async function (client: ClientWithExtendedTypes, msg: Message) {
    const msgTokens = ArgTokenizer(msg);
    if (msgTokens.length < 5) {
      return console.log('Invalid args provided');
    }
    const settingsManager = new SettingsManager(msg.guild!.id);
    const option = msgTokens[3].trim();
    const value = msgTokens[4].trim();

    switch (option) {
      case SETTINGS.ADMIN_ROLES:
        settingsManager.adminRoles = [...settingsManager.adminRoles, value.toLowerCase()];
        // send back a response indicating it was done.
        break;
    }
  },
};

export default command;
