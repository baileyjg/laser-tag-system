import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from "@angular/common/http";
import { AppComponent } from './app.component';
import { SplashScreenComponent } from './components/splash-screen/splash-screen.component';
import { PlayerEntryScreenComponent } from './screens/player-entry-screen/player-entry-screen.component';
import { GameActionScreenComponent } from './screens/game-action-screen/game-action-screen.component';
import { DevModeToolbarComponent } from './components/dev-mode-toolbar/dev-mode-toolbar.component';
import { TransitionScreenComponent } from './components/transition-screen/transition-screen.component';
import { PlayerEntryService } from './services/player-entry.service';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    SplashScreenComponent,
    PlayerEntryScreenComponent,
    GameActionScreenComponent,
    DevModeToolbarComponent,
    TransitionScreenComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    })
  ],
  providers: [PlayerEntryService],
  bootstrap: [AppComponent]
})
export class AppModule { }
