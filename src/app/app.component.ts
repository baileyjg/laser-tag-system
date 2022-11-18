import { Component } from "@angular/core";
import { PlayerEntryService } from "./services/player-entry.service";
import { GameActionService } from "./services/game-action.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent {
  title: string = "laser-tag-system";
  stage: string = "player-entry";
  showTransitionScreen: boolean = false;
  devMode: boolean = false;

  constructor(
    private readonly playerEntryService: PlayerEntryService,
    private readonly gameActionService: GameActionService
    ) {
    this.playerEntryService.showTransitionScreen$.subscribe((show: boolean) => {
      if (show) {
        this.showTransition();
      }
    });

    this.gameActionService.resetGame$.subscribe(() => {
      this.gameReset();
    });
  }

  showTransition() {
    this.showTransitionScreen = true;
    setTimeout(() => {
      this.stage = 'game-action';
    }, 4000);
  }

  gameReset() {
    this.stage = 'player-entry';
  }

  changeStage(stage: string) {
    this.stage = stage;
  }

}
