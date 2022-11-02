import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { GameActionService } from "src/app/services/game-action.service";
import Team from "src/app/Team";

@Component({
  selector: "app-game-action-screen",
  templateUrl: "./game-action-screen.component.html",
  styleUrls: ["./game-action-screen.component.css"],
})
export class GameActionScreenComponent implements OnInit, OnDestroy {
  minutes: number;
  seconds: string;
  secondsNum: number;
  team1: Team; // Stores data for team 1
  team2: Team; // Stores data for team 2
  killfeed: String[]; // An array of killfeed messages
  timer: number; // This is the official countdown timer.
  timerStage: string; // Stage of the timer. Will be either 'cooldown' or 'game'
  cooldownDuration: number; // The length of the cooldown. Set by the game action service.
  gameDuration: number; // The length of the cooldown. Set by the game action service.
  timerDenominator: number; // Used for progress bar

  // Subscriptions
  killfeedSub: Subscription;
  timerSub: Subscription;

  constructor(private gameActionService: GameActionService) {
    this.timerSub = gameActionService.timer$.subscribe(() => {
      // Called when the timer changes
      this.timer = gameActionService.getTime();
      this.timerStage = gameActionService.getTimerStage();
      this.team1 = gameActionService.getTeam1();
      this.team2 = gameActionService.getTeam2();
      this.killfeed = gameActionService.getKillFeed();

      if (this.timerStage === 'cooldown') {
        this.timerDenominator = this.cooldownDuration/100;
      } else {
        this.timerDenominator = this.gameDuration/100;
      }

      this.secondsNum = this.timer % 60;
      this.seconds = this.secondsNum.toString();
      this.minutes = Math.floor(this.timer / 60);
      if(this.secondsNum < 10){
        this.seconds = "0" + this.seconds;
      }
      if(this.secondsNum <= 0){
        this.seconds = "00";
        this.minutes = 0;
      }

    });

    this.killfeedSub = gameActionService.killfeed$.subscribe(() => {
      // Called when killfeed changes
      this.killfeed = gameActionService.getKillFeed();
    });
  }

  ngOnInit(): void {
    this.gameActionService.startGame();
    this.team1 = this.gameActionService.team1;
    this.team2 = this.gameActionService.team2;
    this.timer = this.gameActionService.getTime();
    this.cooldownDuration = this.gameActionService.getCooldownDuration();
    this.gameDuration = this.gameActionService.getGameDuration();

  }

  ngOnDestroy(): void {
      this.killfeedSub.unsubscribe();
      this.timerSub.unsubscribe();
      this.gameActionService.timerSub.unsubscribe();
  }
}
