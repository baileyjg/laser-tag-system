import { Component, OnInit } from '@angular/core';
import { GameActionService } from 'src/app/services/game-action.service';

@Component({
  selector: 'app-game-action-screen',
  templateUrl: './game-action-screen.component.html',
  styleUrls: ['./game-action-screen.component.css']
})
export class GameActionScreenComponent implements OnInit {

  constructor(private gameActionService: GameActionService) { }

  ngOnInit(): void {
  }

}
