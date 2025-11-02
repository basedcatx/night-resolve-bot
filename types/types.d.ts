import { Client, Collection, Interaction, Message } from 'discord.js';
import { SETTINGS } from '../constants/constants';

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

interface MessageCommand {
  description: string;
  execute(client: ClientWithExtendedTypes, msg: Message): Promise<void>;
}

interface Event {
  once: boolean;
  execute(client: ClientWithExtendedTypes, interaction: Message | Interaction): Promise<void>;
}

interface ClientWithExtendedTypes extends Client {
  messageCommands: Collection<string, MessageCommand>;
  events: Collection<string, Event>;
}
