import { Component, OnInit } from '@angular/core';
import { GameActionService } from 'src/app/services/game-action.service';

@Component({
  selector: 'app-game-action-screen',
  templateUrl: './game-action-screen.component.html',
  styleUrls: ['./game-action-screen.component.css']
})
export class GameActionScreenComponent implements OnInit {

  today: number = Date.now();
  minutes: number = 5;
  seconds: string = "00";
  t1score: number = 0;
  t2score: number = 0;
  timerprogress: number = 50;

  constructor(private gameActionService: GameActionService) { }

  ngOnInit(): void {
  }

}
