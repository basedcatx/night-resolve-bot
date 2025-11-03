import { GuildMember } from 'discord.js';
import { GAME_ROLES_TYPE } from '../../types/types';
import { IPlayer } from './interfaces';

export class Player implements IPlayer {
  private readonly guildMember: GuildMember;
  private role: GAME_ROLES_TYPE | undefined = undefined;
  private isAlive: boolean = false;

  constructor(member: GuildMember) {
    this.guildMember = member;
  }

  public get username() {
    return this.guildMember.displayName;
  }

  public setRole(role: GAME_ROLES_TYPE) {
    if (this.role) return;
    this.role = role;
    this.isAlive = true;
  }

  public get id() {
    return this.guildMember.id;
  }

  public hasRole() {
    if (!this.isAlive) return false;
    return this.role && true;
  }
}
