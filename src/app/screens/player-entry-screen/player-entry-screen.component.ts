import { Component, OnInit } from "@angular/core";
import { PlayerEntryService } from "src/app/services/player-entry.service";

@Component({
  selector: "app-player-entry-screen",
  templateUrl: "./player-entry-screen.component.html",
  styleUrls: ["./player-entry-screen.component.css"],
})
export class PlayerEntryScreenComponent implements OnInit {
  
  constructor(private playerEntryService: PlayerEntryService) {}

  ngOnInit(): void {}
}
