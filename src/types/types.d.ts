import { Client, Collection, CommandInteraction, Message } from 'discord.js';
import { GameManager, LobbyManager } from '../classes/game/GameManager';
import { PlayerManager } from '../classes/game/PlayerManager';
import { GameThreadManager } from '../classes/game/GameThreadManager';
import { GameThreadManagerError } from '../errors/GameThreadManagerError';
import { LobbyManagerError } from '../errors/LobbyManagerError';
import { PlayerManagerError } from '../errors/PlayerManagerError';
interface GuildChannelConfig {
  [SETTINGS.ADMIN_ROLES]: string[];
  [SETTINGS.MIN_PLAYERS]: number;
  [SETTINGS.MAX_PLAYERS]: number;
  [SETTINGS.PHASE_DURATION]: number;
  [SETTINGS.REVEAL_ROLES]: boolean;
  [SETTINGS.SKIP_VOTE]: boolean;
  [SETTINGS.HARDCORE_MODE]: boolean;
  [SETTINGS.ALLOW_SPECTATORS]: boolean;
  [SETTINGS.GAME_THEME]: 'mafia';
}

interface Command {
  description: string;
  execute(client: ClientWithExtendedTypes, interaction: Message | CommandInteraction): Promise<void>;
}

interface Event {
  once: boolean;
  execute(client: ClientWithExtendedTypes, interaction: Message | CommandInteraction): Promise<void>;
}

interface ClientWithExtendedTypes extends Client {
  messageCommands: Collection<string, Command>;
  interactionCommands: Collection<string, Command>;
  events: Collection<string, Event>;
  gameManagers: Collection<string, GameManager>;
  lobbyManagers: Collection<string, LobbyManager>;
  playerManagers: Collection<string, PlayerManager>;
  gameThreads: Collection<string, GameThreadManager>;
}

export type GAME_ROLES_TYPE = 'doctor' | 'town member' | 'criminal';
export type Result<T> =
  | { ok: true; value?: T }
  | { ok: false; error: Error | GameThreadManagerError | LobbyManagerError | PlayerManagerError };
export type error_types = 'user' | 'sys';
