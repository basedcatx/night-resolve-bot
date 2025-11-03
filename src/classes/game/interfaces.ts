import { GuildMember } from 'discord.js';
import { GAME_ROLES_TYPE } from '../../types/types';
import { ThreadChannelManager } from '../managers/ThreadChannelManager';
import { TextChannelManager } from '../managers/TextChannelManager';
import { Player } from './Player';

export interface IPlayer {
  readonly guildMember: GuildMember;
  readonly id: string;
  readonly username: string;
  role: GAME_ROLES_TYPE | undefined;
  isAlive: boolean;
}

export interface Game {
  lobbyChannel: TextChannelManager;
  threadChannel: ThreadChannelManager;
  players: Player[];
  gameStarted: boolean;
  id: string;
}

export interface IGameManager {
  startGame(gameId: string): Promise<boolean>;
  endGame(gameId: string): Promise<boolean>;
  postSystemMessage(gameId: string, content: string): Promise<boolean>;
}
