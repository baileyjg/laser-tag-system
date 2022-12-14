export default class Player {
  private id: number;
  private name: string;
  private killCount: number;
  private deathCount: number;
  private profilePicSrc: string;

  constructor(id: number, name: string) {
    this.id = id;
    this.name = name;
    this.killCount = 0;
    this.deathCount = 0;

    this.generateProfilePic();
  }

  // Setters
  public updateDeathCount(n: number): void {
    this.deathCount = n;
  }

  public updateKillCount(n: number): void {
    this.killCount = n;
  }

  // Getters
  public getName(): string {
    return this.name;
  }

  public getKillCount(): number {
    return this.killCount;
  }

  public getDeathCount(): number {
    return this.deathCount;
  }

  public getProfilePicUrl(): string {
    return this.profilePicSrc;
  }

  public getID() {
    return this.id;
  }

  // Helpers
  private generateProfilePic(): void {
    const urlName = this.name.replace(/[^a-zA-Z0-9]/g, "");
    this.profilePicSrc = `https://robohash.org/${urlName}`;
  }
}
