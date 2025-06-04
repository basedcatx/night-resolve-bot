import { SettingsManager } from '../../structures/settings/SettingsManager';

export const HELP_EMBED_DESCRIPTION = `
**Guild Settings**
* \`!mafia settings\` - View your server's mafia game rules

* \`!mafia settings set <option> <value> \` - modify your server's mafia game rules

* \`!mafia settings help\` to get a list of configurable options (applies per guild).

**Commands**
* \`!mafia settings\` - View or modify your server's mafia game rules

* \`!mafia settings help\` to get a list of configurable options (applies per guild).

**Help Topics**
* \`!mafia help gameplay\` - Learn how the game works

* \`!mafia help advanced\` - For experienced players & hosts (soon)

* Need more help? Join our support server: https://discord.gg/bNqsV8FZSn
`;

export const HELP_SETTINGS_DESCRIPTION = (settingsManager: SettingsManager) => `
* \`!mafia settings set <option> <value> \` - To modify any settings below (per guild)[overrides]

* \`!mafia settings add <value> \` - To append values to some specific settings eg game initiator roles. They are marked with [/]

**General settings**
* *[/] Game initiator roles:* \`${settingsManager.adminRoles.map((r) => `${r} `)}\` - can control the game lobby (start and stop lobby). This roles are not case sensitive

* *Allow game spectators:* \`${settingsManager.allowSpectators}\` - can join private threads as spectators, but can't take part in the game.

* *Day phase duration (Seconds):* \`${settingsManager.dayDuration / 1000}\` - How long the day phase lasts before the night comes.

* *Night phase duration (Seconds):* \`${settingsManager.nightDuration / 1000}\` - How long the night phase lasts before the day comes.

** Misc settings**
* *Set the minimum players:* \`${settingsManager.minimumPlayers}\` - Determines the minimum players to start a game. Cannot be less than 5 players.

* *Set the maximum players:* \`${settingsManager.maximumPlayers}\` - Determines the maximum players to start a game. \`0\` means there is no cap.

* *Set skip voting allowed:* \`${settingsManager.skipVoteAllowed}\` - Allows skipping votes, if town members are not certain.

* *Set skip voting allowed:* \`${settingsManager.revealRolesImmediatelyOnDeath}\` - When someone is killed, their roles are immediately revealed.
`;
