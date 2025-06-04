import { SETTINGS, SETTINGS_COMMANDS, TIMEOUTS } from '../../../../constants/constants';
import { Message } from 'discord.js';
import { ClientWithExtendedTypes } from '../../../../types/types';
import ArgTokenizer from '../../../../utils/ArgTokenizer';
import { SettingsManager } from '../../../../structures/settings/SettingsManager';
import { boolean } from 'drizzle-orm/gel-core';

const command = {
  name: SETTINGS_COMMANDS.SETTINGS_SET.NAME,
  description: SETTINGS_COMMANDS.SETTINGS_SET.DESCRIPTION,
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
        settingsManager.adminRoles = [value.toLowerCase()];
        // send back a response indicating it was done.
        break;

      case SETTINGS.ALLOW_SPECTATORS:
        if ((value as unknown) instanceof boolean) {
          // here we can inform the user his request was successful
          return;
        }

        // The value was not of type boolean so we have to exit and inform the user
        break;

      case SETTINGS.DAY_DURATION:
        if (Number(value)) {
          return (settingsManager.dayDuration = Number(value));
          // We can inform the user the operation was succeeded.
        }
    }
  },
};

export default command;
