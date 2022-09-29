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
  team1: Team;
  team2: Team;
  team1Form: FormGroup;
  team2Form: FormGroup;
  team1PlayerNameForm: FormGroup;
  team2PlayerNameForm: FormGroup;
  playerTeam1NoExist = false;
  playerTeam2NoExist = false;
  private team1Sub: Subscription;
  private team2Sub: Subscription;

  constructor(private playerEntryService: PlayerEntryService) {}

  ngOnInit(): void {
    this.team1Form = new FormGroup({
      playerID1: new FormControl("", Validators.required),
    });

    this.team1PlayerNameForm = new FormGroup({
      toAdd1: new FormControl(""),
    });

    this.team2Form = new FormGroup({
      playerID2: new FormControl("", Validators.required),
    });

    this.team2PlayerNameForm = new FormGroup({
      toAdd2: new FormControl(""),
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
          if (teamNum === 1) this.playerTeam1NoExist = true;
          else if (teamNum === 2) this.playerTeam2NoExist = true;
          else reportError("OOPS! Something went wrong.");
        } else {
          this.playerTeam1NoExist = false;
          this.playerTeam2NoExist = false;
          this.team1Form.reset();
          this.team2Form.reset();
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

  enterPlayer(teamNumber: number) {
    if (teamNumber === 1) {
      //creates a new player with the value from the input for an ID
      //and the value from the input for a new code name
      this.playerEntryService.addPlayer(
        new Player(
          this.team1Form.value.playerID1,
          this.team1PlayerNameForm.controls.toAdd1.value
        ),
        teamNumber
      );
      //playerTeam1NoExist is a boolean to make the input box appear
      //and disapear
      this.playerTeam1NoExist = false;
      this.team1Form.reset();
      this.team1PlayerNameForm.reset();
    } else if (teamNumber === 2) {
      this.playerEntryService.addPlayer(
        new Player(
          this.team2Form.value.playerID2,
          this.team2PlayerNameForm.controls.toAdd2.value
        ),
        teamNumber
      );
      this.playerTeam2NoExist = false;
      this.team2Form.reset();
      this.team2PlayerNameForm.reset();
    } else {
      reportError(
        "OOPS! Something went wrong adding this player. Line 110 of player-entry-screen.component.ts"
      );
    }
  }

  removePlayer(player: Player, teamNumber: number) {
    if (teamNumber === 1) {
      this.team1.players[this.team1.players.indexOf(player)] = null;
    } else if (teamNumber === 2) {
      this.team2.players[this.team2.players.indexOf(player)] = null;
    } else {
      reportError(
        "OOPS! Something went wrong removing this player. Line 122 in player-entry-screen.component.ts"
      );
    }
  }

  startGame() {
    let count = 0;
    const result = this.team1.players.filter((element): element is Player => {
      return element !== null;
    });
    console.log("start game works (create call here)");
    console.log(result);
  }
}
