import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import Player from "src/app/Player";
import Team from "src/app/Team";
import { PlayerEntryService } from "src/app/services/player-entry.service";
import { FormGroup, Validators, FormControl } from "@angular/forms";

@Component({
  selector: "app-player-entry-screen",
  templateUrl: "./player-entry-screen.component.html",
  styleUrls: ["./player-entry-screen.component.css"],
})
export class PlayerEntryScreenComponent implements OnInit, OnDestroy {
  constructor(private playerEntryService: PlayerEntryService) {}
  players: Player[] = new Array();
  id: number = 1;
  playerEntered: string;

  private team1Sub: Subscription;
  private team2Sub: Subscription;
  team1: Team;
  team2: Team;
  team1Form: FormGroup;
  team1PlayerNameForm: FormGroup;
  playerID: FormControl;
  playerNoExist = false;

  ngOnInit(): void {
    this.team1Form = new FormGroup({
      playerID: new FormControl("", Validators.required),
    });

    this.team1PlayerNameForm = new FormGroup({
      toAdd: new FormControl(""),
    });

    this.team1 = this.playerEntryService.getTeam1();
    this.team2 = this.playerEntryService.getTeam2();

    this.team1Sub = this.playerEntryService.team1$.subscribe((team: Team) => {
      this.team1 = team;
    });

    this.team2Sub = this.playerEntryService.team2$.subscribe((team: Team) => {
      this.team2 = team;
    });
  }

  async fetch_player(id: number, teamNum: number) {
    this.playerEntryService.fetchPlayerInfo(id, teamNum).then(
      (result) => {
        if (!result) {
          console.log(result);
          this.playerNoExist = true;
        } else {
          this.team1Form.reset();
        }
      },
      (error) => {
        console.log("ERROR: player entry screen -> add_player()");
        console.log(error);
        return false;
      }
    );
  }

  ngOnDestroy(): void {
    this.team1Sub.unsubscribe();
    this.team2Sub.unsubscribe();
    this.team1Form = new FormGroup({
      playerAdded: new FormControl("", Validators.required),
    });
  }

  enterPlayer(id: number, teamNumber: number) {
    let newPlayer = new Player(
      id,
      this.team1PlayerNameForm.controls.toAdd.value
    );
    this.team1.players[id] = newPlayer;
    this.playerNoExist = false;
    this.team1Form.reset();
    console.log(this.team1);
  }

  removePlayer(id: number, teamNumber: number) {
    console.log(id);
    console.log(this.team1.players);
    if (teamNumber === 1) {
      this.team1.players[id] = null;
    }
  }

  startGame() {
    let count = 0;
    const result = this.players.filter((element): element is Player => {
      return element !== null;
    });
    console.log("start game works (create call here)");
    console.log(result);
  }
}
