import { Component } from "@angular/core";
import { PlayerEntryService } from "./services/player-entry.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent {
  title: string = "laser-tag-system";
  stage: string = "player-entry";
  showTransitionScreen: boolean = false;
  devMode: boolean = true;

  constructor(private readonly playerEntryService: PlayerEntryService) {
    this.playerEntryService.showTransitionScreen$.subscribe((show: boolean) => {
      if (show) {
        this.showTransition();
      }
    })
  }

  showTransition() {
    this.showTransitionScreen = true;
    setTimeout(() => {
      this.stage = 'game-action';
    }, 4000);
  }

  changeStage(stage: string) {
    this.stage = stage;
  }

}
