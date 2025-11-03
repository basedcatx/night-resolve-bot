import { ChannelType } from 'discord.js';

/**
 * Defines the contract for the game's Channel Manager Object
 * It strictly exposes only high-level methods (necessary)
 */
export interface IChannelManager {
  readonly id: string;
  readonly name: string;
  readonly type: ChannelType;
  postSystemMessage(content: string): Promise<void>;
  isPostable(): boolean; // Either a channel is postable or archieved.
}

export interface IGuildManager {
  readonly name: string;
  readonly id: string;
}
