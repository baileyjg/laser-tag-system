import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  gameStage: string;

  gameStage$ = new Subject<string>();

  constructor() {
    this.gameStage$.subscribe(s => this.gameStage = s);
   }

  setStage(stage: string): void {
    this.gameStage$.next(stage);
  }

}
