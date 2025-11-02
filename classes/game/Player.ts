export class Player {
  private username: string;
  private id: string;

  constructor(username: string, id: string) {
    this.id = id;
    this.username = username;
  }

  public getUsername() {
    return this.username;
  }

  public getId() {
    return this.id;
  }
}
