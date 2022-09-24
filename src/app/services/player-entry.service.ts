import { Injectable } from "@angular/core";
import Player from "../Player";
import Team from "../Team";
import { Subject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class PlayerEntryService {
  
  // Mock Data - will be deleted when backend is hooked up
  team1MockData: Team = {
    name: "Cowboys",
    color: "blue",
    score: 0,
    players: [new Player(1, "Hank"), new Player(2, "Bill"), new Player(3, "Buster"), new Player(4, "Colt")],
  };

  team2MockData = {
    name: "Indians",
    color: "red",
    score: 0,
    players: [
      new Player(5, "Crazy Horse"),
      new Player(6, "White Feather"),
      new Player(7, "Round Pot"),
      new Player(8, "Winona"),
    ],
  };

  existingPlayers = {
    10: new Player(10, "Steve"),
    11: new Player(11, "Tanisha"),
    27: new Player(27, "Michelle"),
    54: new Player(54, "Danny"),
  };

  // Variables
  team1$ = new Subject<Team>();
  team2$ = new Subject<Team>();

  team1: Team = this.team1MockData;
  team2: Team = this.team2MockData;

  getTeam1(): Team {
    return this.team1;
  }

  getTeam2(): Team {
    return this.team2;
  }

  addPlayer(player: Player, teamNum: number) {
    // Called when adding a new player into the DB
    if (teamNum === 1) {
      this.team1.players.push(player);
      this.team1$.next(this.team1);
    } else if (teamNum === 2) {
      this.team2.players.push(player);
      this.team2$.next(this.team2);
    }
  }

  fetchPlayerInfo(id: number, teamNum: number): Promise<boolean> {
    // Query the player ID from DB (using mock data for now)
    // If ID exists, return true
    // Else return false
    // Using setTimeout to simulate async data from backend
    return new Promise((resolve) => {
      setTimeout(() => {
        if (Object.keys(this.existingPlayers).includes(String(id))) {
          if (teamNum === 1) {
            this.team1.players.push(this.existingPlayers[id]);
            this.team1$.next(this.team1);
          } else if (teamNum === 2) {
            this.team2.players.push(this.existingPlayers[id]);
            this.team2$.next(this.team2);
          } else {
            resolve(false);
          }
          resolve(true);
        } else {
          resolve(false);
        }
      }, 1000);
    });
  }
}
