import { ClientWithExtendedTypes } from '../../types/types';
import { LobbyManager } from './LobbyManager';

export class GameManager {
  readonly id: string;

  private constructor(guildId: string) {
    this.id = guildId;
  }

  getGameManager(guildId: string, client: ClientWithExtendedTypes): GameManager {
    const existing = client.gameManagers.get(guildId);
    if (existing) return existing;
    const manager = new GameManager(guildId);
    client.gameManagers.set(guildId, manager);
    return manager;
  }

  getLobbyManager(channelId: string, client: ClientWithExtendedTypes): LobbyManager {
    const existing: LobbyManager[] = client.lobbyManagers.get(channelId);
    const manager = new LobbyManager(channelId);
    existing.push(manager);
    client.lobbyManagers.set(channelId, existing);
    return manager;
  }
}
