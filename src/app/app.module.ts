import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from "@angular/common/http";
import { AppComponent } from './app.component';
import { SplashScreenComponent } from './components/splash-screen/splash-screen.component';
import { PlayerEntryScreenComponent } from './screens/player-entry-screen/player-entry-screen.component';
import { GameActionScreenComponent } from './screens/game-action-screen/game-action-screen.component';
import { DevModeToolbarComponent } from './components/dev-mode-toolbar/dev-mode-toolbar.component';

@NgModule({
  declarations: [
    AppComponent,
    SplashScreenComponent,
    PlayerEntryScreenComponent,
    GameActionScreenComponent,
    DevModeToolbarComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
