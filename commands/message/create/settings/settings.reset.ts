import { GAME_GUILD_SETTINGS_DEFAULTS, TIMEOUTS } from '../../../../constants/constants';
import { Message } from 'discord.js';
import { ClientWithExtendedTypes } from '../../../../types/types';
import ArgTokenizer from '../../../../utils/ArgTokenizer';
import { SETTINGS, SETTINGS_COMMANDS } from '../../../../constants/commands/settings.command.constants';
import { SettingsManager } from '../../../../structures/settings/SettingsManager';

const command = {
  name: SETTINGS_COMMANDS.SETTINGS_ADD.NAME,
  description: SETTINGS_COMMANDS.SETTINGS_ADD.DESCRIPTION,
  cooldown: TIMEOUTS.HELP_TIMEOUT,
  execute: async function (client: ClientWithExtendedTypes, msg: Message) {
    const msgTokens = ArgTokenizer(msg);
    if (msgTokens.length < 5) {
      return console.log('Invalid args provided');
    }
    const settingsManager = new SettingsManager(msg.guild!.id);
    const option = msgTokens[3].trim();

    // Reminder: We have to add GAME_THEME to our settings manager.
    switch (option) {
      case SETTINGS.ADMIN_ROLES:
        settingsManager.adminRoles = GAME_GUILD_SETTINGS_DEFAULTS.adminRoles;
        // send back a response indicating it was done.
        break;
      case SETTINGS.ALLOW_SPECTATORS:
        settingsManager.allowSpectators = GAME_GUILD_SETTINGS_DEFAULTS.allowSpectators;
        //send back a response indication it was done.
        break;
      case SETTINGS.REVEAL_ROLES:
        settingsManager.revealRolesImmediatelyOnDeath = GAME_GUILD_SETTINGS_DEFAULTS.revealRolesOnDeath;
        //send back a response indicating it was done and break
        break;
      case SETTINGS.SKIP_VOTE:
        settingsManager.skipVoteAllowed = GAME_GUILD_SETTINGS_DEFAULTS.skipVoteAllowed;
        //send back a response indicating it was done and break
        break;
      case SETTINGS.DAY_DURATION:
        settingsManager.dayDuration = GAME_GUILD_SETTINGS_DEFAULTS.dayDuration;
        //send back a response indicating it was done an break.
        break;
      case SETTINGS.NIGHT_DURATION:
        settingsManager.nightDuration = GAME_GUILD_SETTINGS_DEFAULTS.nightDuration;
        //send back a response indicating it was done and break.
        break;
      case SETTINGS.MAX_PLAYERS:
        settingsManager.maximumPlayers = GAME_GUILD_SETTINGS_DEFAULTS.maximumPlayers;
        //send back a response indicating it was done and break
        break;
      case SETTINGS.MIN_PLAYERS:
        settingsManager.minimumPlayers = GAME_GUILD_SETTINGS_DEFAULTS.minimumPlayers;
        //send back a response indicating it was done and break
        break;
      case SETTINGS.HARDCORE_MODE:
        settingsManager.hardcoreMode = GAME_GUILD_SETTINGS_DEFAULTS.hardcoreMode;
        // send back a response indicating it was done and break
        break;

      default:
        // send a response saying the requested option was not found
        break;
    }
  },
};

export default command;
