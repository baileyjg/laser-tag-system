import { Component, OnInit } from "@angular/core";
import { PlayerEntryService } from "src/app/services/player-entry.service";
import  Player  from "src/app/Player";

@Component({
  selector: "app-player-entry-screen",
  templateUrl: "./player-entry-screen.component.html",
  styleUrls: ["./player-entry-screen.component.css"],
})
export class PlayerEntryScreenComponent implements OnInit {
  constructor(private playerEntryService: PlayerEntryService) {}
  players:Player[] = new Array();
  id: number = 1;
  playerEntered: string;

  ngOnInit(): void {
  }

  enterPlayer(playerName:string){
    let newPlayer = new Player(this.id, playerName);
    this.id++;
    this.players.push(newPlayer);
    console.log(this.players);
  }
}
