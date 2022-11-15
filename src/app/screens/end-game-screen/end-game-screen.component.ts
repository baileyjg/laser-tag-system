import { Component, OnInit } from "@angular/core";
import Player from "src/app/Player";
import Team from "src/app/Team";
import { GameActionService } from "src/app/services/game-action.service";

@Component({
  selector: "app-end-game-screen",
  templateUrl: "./end-game-screen.component.html",
  styleUrls: ["./end-game-screen.component.css"],
})
export class EndGameScreenComponent implements OnInit {
  team2MockData: Team = {
    name: "Rappers",
    color: "red",
    score: 1420,
    players: [
      new Player(5, "Biz Bone"),
      new Player(6, "Queen C"),
      new Player(7, "Vanilla Papa"),
      new Player(8, "Gangsta G"),
    ],
  };

  constructor( private readonly gameActionService: GameActionService) {}

  ngOnInit(): void {}

  resetGame() {
    this.gameActionService.resetGame$.next();
  }
}
