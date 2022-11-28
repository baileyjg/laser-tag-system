import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { interval, Subject } from "rxjs";
import Player from "../Player";
import Team from "../Team";
import { AppService } from "./app.service";
import { PlayerEntryService } from "./player-entry.service";

@Injectable({
  providedIn: "root",
})
export class GameActionService {
  constructor(
    private http: HttpClient,
    private playerEntryService: PlayerEntryService,
    private appService: AppService) {}

  // Mock Data
  team1MockData: Team = {
    name: "Hillbillys",
    color: "blue",
    score: 1337,
    players: [new Player(1, "Wilbur"), new Player(2, "Peggy"), new Player(3, "Bubba"), new Player(4, "Billy")],
  };

  team2MockData = {
    name: "Rappers",
    color: "red",
    score: 1420,
    players: [
      new Player(5, "Biz Bone"),
      new Player(6, "Queen C"),
      new Player(7, "Vanilla Papa"),
      new Player(8, "Gangsta G"),
    ]
  }

  // Set the backend URL
  backendURL = "http://localhost:8080/api";
  // backendURL = "https://laserbacks-backend.herokuapp.com/api";

  // Observables
  team1$ = new Subject<Team>();
  team2$ = new Subject<Team>();
  killfeed$ = new Subject<String[]>();
  showTransitionScreen$ = new Subject<boolean>();
  resetGame$ = new Subject<void>();

  // Variables
  team1: Team;
  team2: Team;
  killfeed = [];

  timerStage = "cooldown";
  cooldownTime = 30; // Sets the cooldown time
  gameTime = 360; // Sets the game timer

  gameTimer = this.cooldownTime;
  timer$ = interval(1000);

  team2Sub = this.team2$.subscribe(data => this.team2 = data);
  team1Sub = this.team1$.subscribe(data => this.team1 = data);
  killfeedSub = this.killfeed$.subscribe((data: string[]) => this.killfeed = data)
  public timerSub = this.timer$.subscribe(() => {

    if (this.gameTimer <= 0 && this.timerStage == "game") {
      // Game is over
      this.stopTimer();
      this.endGameBE();
      this.endGame();
    } else if (this.gameTimer <= 0 && this.timerStage == "cooldown") {
      // Cooldown is over
      this.timerStage = "game";
      this.gameTimer = this.gameTime;
      this.startNewGameBE();
    }

    if (this.gameTimer % 2 === 0 ) {
      this.getGameData();
    }

    this.gameTimer -= 1;
  });

  startGame() {
    this.loadTeamsFromPlayerEntry();
  }

  stopTimer() {
    this.timerSub.unsubscribe();
  }

  loadTeamsFromPlayerEntry() {
    this.team1 = this.playerEntryService.getTeam1();
    this.team2 = this.playerEntryService.getTeam2();
    if (this.team1.players.length === 0) this.team1 = this.team1MockData;
    if (this.team2.players.length === 0) this.team2 = this.team2MockData;
  }

  startNewGameBE(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.http.post(`${this.backendURL}/game/${this.playerEntryService.gameID}/start`, null).subscribe(returnedData => {
        try {
          console.log("startNewGameBE() returned " + (returnedData as any).running);
          (returnedData as any).running == true ? resolve() : reject();
        } catch {
          console.log("ERROR: Game was created, but there was an error starting the game");
          reject();
        }
      });
    });
  }

  endGameBE(): void {
    this.http.delete(`${this.backendURL}/game/${this.playerEntryService.gameID}`).subscribe({
      next: () => {
        console.log("DELETE request successful");
      },
      error: () => {
        console.log("There was an error with the DELETE request");
      }
    });
  }

  getGameData(): void {
      this.http.get(`${this.backendURL}/game/${this.playerEntryService.gameID}`).subscribe(returnedData => {

        const data = returnedData as any;
        let tmpTeam1 = this.team1;
        let tmpTeam2 = this.team2;

        tmpTeam1.score = 0;
        tmpTeam2.score = 0;

        if (data.team1) {
          for (var id in data.team1.players) {
            // Loop through team 1 players that the BE returns
            if (data.team1.players.hasOwnProperty(id)) {
                let i = tmpTeam1.players.findIndex(p => String(p.getID()) === id);
                tmpTeam1.players[i].updateDeathCount(data.team1.players[id].deaths);
                tmpTeam1.players[i].updateKillCount(data.team1.players[id].kills);
                tmpTeam1.score += data.team1.players[id].kills * 50;
            }
          }
        }

        if (data.team2) {
          for (var id in data.team2.players) {
            // Loop through team 2 players that the BE returns
            if (data.team2.players.hasOwnProperty(id)) {
              let i = tmpTeam2.players.findIndex(p => String(p.getID()) === id);
              tmpTeam2.players[i].updateDeathCount(data.team2.players[id].deaths);
              tmpTeam2.players[i].updateKillCount(data.team2.players[id].kills);
              tmpTeam2.score += data.team2.players[id].kills * 50;
            }
          }
        }

        this.team1$.next(tmpTeam1);
        this.team2$.next(tmpTeam2);

        if (data.killFeed) {
          this.killfeed$.next(data.killFeed.reverse());
        }
      });
  }

  endGame(): void {
    this.appService.setStage('end-game');
    this.gameTimer = this.cooldownTime;
    this.timerStage = "cooldown";
  }

  // Getters
  getTime(): number { return this.gameTimer }
  getTimerStage(): string { return this.timerStage }
  getTeam1(): Team { return this.team1 }
  getTeam2(): Team { return this.team2 }
  getKillFeed(): String[] { return this.killfeed }
  getCooldownDuration(): number { return this.cooldownTime }
  getGameDuration(): number { return this.gameTime }
}
