import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { interval, Subject } from "rxjs";
import Player from "../Player";
import Team from "../Team";
import { PlayerEntryService } from "./player-entry.service";

@Injectable({
  providedIn: "root",
})
export class GameActionService {
  constructor(private http: HttpClient, private playerEntryService: PlayerEntryService) {}

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
  // backendURL = "http://localhost:8080";
  //backendURL = "https://laserbacks-backend.herokuapp.com";
  backendURL = "/api";

  // Observables
  team1$ = new Subject<Team>();
  team2$ = new Subject<Team>();
  killfeed$ = new Subject<String[]>();
  showTransitionScreen$ = new Subject<boolean>();
  resetGame$ = new Subject<void>();

  // Variables
  team1: Team;
  team2: Team;
  killfeed = ["Wilbur shot Biz Bone", "Peggy shot Queen C", "Bubba shot Vanilla Papa", "Billy shot Gangsta G", "Bubba shot Biz Bone", "Queen C shot Bubba", "Vanilla Papa shot Billy", "Wilbur shot Biz Bone", "Peggy shot Queen C", "Bubba shot Vanilla Papa", "Billy shot Gangsta G", "Bubba shot Biz Bone", "Queen C shot Bubba", "Vanilla Papa shot Billy", "Wilbur shot Biz Bone", "Peggy shot Queen C", "Bubba shot Vanilla Papa", "Billy shot Gangsta G", "Bubba shot Biz Bone", "Queen C shot Bubba", "Vanilla Papa shot Billy", "Wilbur shot Biz Bone", "Peggy shot Queen C", "Bubba shot Vanilla Papa", "Billy shot Gangsta G", "Bubba shot Biz Bone", "Queen C shot Bubba"];

  timerStage = "cooldown";
  cooldownTime = 30; // Sets the cooldown time
  gameTime = 360; // Sets the game timer

  gameTimer = this.cooldownTime;
  timer$ = interval(1000);

  public timerSub = this.timer$.subscribe(() => {

    if (this.gameTimer <= 0 && this.timerStage == "game") {
      // Game is over
      this.stopTimer();
    }

    if (this.gameTimer <= 0 && this.timerStage == "cooldown") {
      // Cooldown is over
      this.timerStage = "game";
      this.gameTimer = this.gameTime;
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
    console.log(this.playerEntryService.getTeam1().players)
    this.team1 = this.playerEntryService.getTeam1();
    this.team2 = this.playerEntryService.getTeam2();
    if (this.team1.players.length === 0) this.team1 = this.team1MockData;
    if (this.team2.players.length === 0) this.team2 = this.team2MockData;
    console.log(this.team1);
    console.log(this.team2);
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
