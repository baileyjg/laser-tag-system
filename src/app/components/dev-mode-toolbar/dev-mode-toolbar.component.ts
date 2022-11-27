import { Component, OnInit, Output } from "@angular/core";
import { AppService } from "src/app/services/app.service";

@Component({
  selector: "app-dev-mode-toolbar",
  templateUrl: "./dev-mode-toolbar.component.html",
  styleUrls: ["./dev-mode-toolbar.component.css"],
})
export class DevModeToolbarComponent implements OnInit {

  constructor(private appService: AppService) {}

  ngOnInit(): void {}

  setStagePlayerEntry = () => {
    this.appService.setStage('player-entry');
  };

  setStageGameAction = () => {
    this.appService.setStage('game-action');
  };

  setStageEndGame = () => {
    this.appService.setStage('end-game');
  }
}
