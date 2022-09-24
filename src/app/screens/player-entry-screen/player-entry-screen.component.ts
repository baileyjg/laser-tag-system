import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import Player from "src/app/Player";
import Team from "src/app/Team";
import { PlayerEntryService } from "src/app/services/player-entry.service";

@Component({
  selector: "app-player-entry-screen",
  templateUrl: "./player-entry-screen.component.html",
  styleUrls: ["./player-entry-screen.component.css"],
})
export class PlayerEntryScreenComponent implements OnInit, OnDestroy {
  private team1Sub: Subscription;
  private team2Sub: Subscription;

  team1: Team;
  team2: Team;

  constructor(private playerEntryService: PlayerEntryService) {}

  ngOnInit(): void {
    this.team1 = this.playerEntryService.getTeam1();
    this.team2 = this.playerEntryService.getTeam2();

    this.team1Sub = this.playerEntryService.team1$.subscribe((team: Team) => {
      this.team1 = team;
    });

    this.team2Sub = this.playerEntryService.team2$.subscribe((team: Team) => {
      this.team2 = team;
    });
  }

  async add_player(id: number, teamNum: number) {
    this.playerEntryService.fetchPlayerInfo(id, teamNum).then(
      (result) => {
        return result;
      },
      (error) => {
        console.log("ERROR: player entry screen -> add_player()");
        console.log(error);
      }
    );
  }

  ngOnDestroy(): void {
    this.team1Sub.unsubscribe();
    this.team2Sub.unsubscribe();
  }
}
