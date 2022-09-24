import { Component } from "@angular/core";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent {
  title: string = "laser-tag-system";
  stage: string = "player-entry";
  devMode: boolean = true;

  changeStage(stage: string) {
    this.stage = stage;
  }
}
