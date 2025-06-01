import { Client, Collection } from 'discord.js';

interface GuildConfig {
  adminRoles: string[];
  minimumPlayers: number;
  maximumPlayers: number;
  dayDuration: number;
  nightDuration: number;
  revealRolesOnDeath: boolean;
  skipVoteAllowed: boolean;
  hardcoreMode: boolean;
  allowSpectators: boolean;
  gameTheme: 'mafia';
}

interface MessageCommand {
  name: string;
  description: string;
  execute: () => void;
}

interface ClientWithExtendedTypes extends Client {
  messageCommands: Collection<string, MessageCommand>;
}
