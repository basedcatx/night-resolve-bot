import { SettingsManager } from '../../classes/SettingsManager';

export const SETTINGS_EMBED_DESCRIPTION_MD = async (settingsManager: SettingsManager) => `
* \`!mafia settings set <option> <value> \` - To modify any settings below (per guild)[overrides]

* \`!mafia settings add <value> \` - To append values to some specific settings eg game initiator roles. They are marked with [/]

**General settings**
* *[/] Game initiators role:* \`${(await settingsManager.getAdminRoles()).map((r) => `${r} `)}\` - can control the game lobby (start and stop lobby). This roles are not case sensitive

* *Allow game spectators:* \`${await settingsManager.getAllowSpectators()}\` - can join private threads as spectators, but can't take part in the game.

* *Phase duration (Seconds):* \`${await settingsManager.getPhaseChangeDuration()}\` - How long the day/night phase lasts. 

** Misc settings**
* *Set the minimum players:* \`${await settingsManager.getMinimumPlayers()}\` - Determines the minimum players to start a game. Cannot be less than 5 players.

* *Set the maximum players:* \`${await settingsManager.getMaximumPlayers()}\` - Determines the maximum players to start a game. \`0\` means there is no cap.

* *Set skip voting allowed:* \`${await settingsManager.getSkipVoteAllowed()}\` - Allows skipping votes, if town members are not certain.

* *Set reveal roles on death allowed:* \`${await settingsManager.getRevealRolesImmediatelyOnDeath()}\` - When someone is killed, their roles are immediately revealed.
`;
