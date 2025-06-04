import { GAME_GUILD_SETTINGS_DEFAULTS, SETTINGS, SETTINGS_COMMANDS, TIMEOUTS } from '../../../../constants/constants';
import { Message } from 'discord.js';
import { ClientWithExtendedTypes } from '../../../../types/types';
import ArgTokenizer from '../../../../utils/ArgTokenizer';
import { SettingsManager } from '../../../../structures/settings/SettingsManager';
import { SettingsResetEmbedClass } from '../../../../components/settings/settings.reset.embed';

const command = {
  name: SETTINGS_COMMANDS.SETTINGS_RESET.NAME,
  description: SETTINGS_COMMANDS.SETTINGS_RESET.DESCRIPTION,
  cooldown: TIMEOUTS.DEFAULT_TIMEOUT,
  execute: async function (client: ClientWithExtendedTypes, msg: Message) {
    const msgTokens = ArgTokenizer(msg);
    if (msgTokens.length < 4) {
      return console.log('Invalid args provided');
    }
    const settingsManager = new SettingsManager(msg.guild!.id);
    const option = msgTokens[3].trim();

    // Reminder: We have to add GAME_THEME to our settings manager.
    switch (option) {
      case SETTINGS.ADMIN_ROLES:
        settingsManager.adminRoles = GAME_GUILD_SETTINGS_DEFAULTS.initiators;
        msg.reply({ embeds: [SettingsResetEmbedClass.embedSuccess(option)] });
        break;
      case SETTINGS.ALLOW_SPECTATORS:
        settingsManager.allowSpectators = GAME_GUILD_SETTINGS_DEFAULTS.spectators;
        msg.reply({ embeds: [SettingsResetEmbedClass.embedSuccess(option)] });
        break;
      case SETTINGS.REVEAL_ROLES:
        settingsManager.revealRolesImmediatelyOnDeath = GAME_GUILD_SETTINGS_DEFAULTS.reveal;
        msg.reply({ embeds: [SettingsResetEmbedClass.embedSuccess(option)] });
        break;
      case SETTINGS.SKIP_VOTE:
        settingsManager.skipVoteAllowed = GAME_GUILD_SETTINGS_DEFAULTS.skip;
        msg.reply({ embeds: [SettingsResetEmbedClass.embedSuccess(option)] });
        break;
      case SETTINGS.DAY_DURATION:
        settingsManager.dayDuration = GAME_GUILD_SETTINGS_DEFAULTS.day;
        msg.reply({ embeds: [SettingsResetEmbedClass.embedSuccess(option)] });
        break;
      case SETTINGS.NIGHT_DURATION:
        settingsManager.nightDuration = GAME_GUILD_SETTINGS_DEFAULTS.night;
        msg.reply({ embeds: [SettingsResetEmbedClass.embedSuccess(option)] });
        break;
      case SETTINGS.MAX_PLAYERS:
        settingsManager.maximumPlayers = GAME_GUILD_SETTINGS_DEFAULTS.max;
        msg.reply({ embeds: [SettingsResetEmbedClass.embedSuccess(option)] });
        break;
      case SETTINGS.MIN_PLAYERS:
        settingsManager.minimumPlayers = GAME_GUILD_SETTINGS_DEFAULTS.min;
        msg.reply({ embeds: [SettingsResetEmbedClass.embedSuccess(option)] });
        break;
      case SETTINGS.HARDCORE_MODE:
        settingsManager.hardcoreMode = GAME_GUILD_SETTINGS_DEFAULTS.hardcore;
        msg.reply({ embeds: [SettingsResetEmbedClass.embedSuccess(option)] });
        break;
      case SETTINGS.GAME_THEME:
        // settingsManager.gameTheme = GAME_GUILD_SETTINGS_DEFAULTS.theme;
        msg.reply({ embeds: [SettingsResetEmbedClass.embedSuccess(option)] });
        break;

      default:
        // send a response saying the requested option was not found
        msg.reply({ embeds: [SettingsResetEmbedClass.embedNotFoundError()] });
        break;
    }
  },
};

export default command;
