import { Component } from "@angular/core";
import { AppService } from "./services/app.service";
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
  devMode: boolean = false;

  constructor(private readonly playerEntryService: PlayerEntryService, private readonly appService: AppService) {
    this.playerEntryService.showTransitionScreen$.subscribe((show: boolean) => {
      if (show) {
        this.showTransition();
      }
    });

    this.appService.gameStage$.subscribe(s => this.stage = s);
  }

  showTransition() {
    this.showTransitionScreen = true;
    setTimeout(() => {
      this.stage = 'game-action';
    }, 4000);
  }

}
