import { Component, EventEmitter, OnInit, Output } from "@angular/core";

@Component({
  selector: "app-dev-mode-toolbar",
  templateUrl: "./dev-mode-toolbar.component.html",
  styleUrls: ["./dev-mode-toolbar.component.css"],
})
export class DevModeToolbarComponent implements OnInit {
  @Output() changeStageEvent = new EventEmitter<string>();

  constructor() {}

  ngOnInit(): void {}

  setStagePlayerEntry = () => {
    this.changeStageEvent.emit("player-entry");
  };

  setStageGameAction = () => {
    this.changeStageEvent.emit("game-action");
  };
}
