import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FilterButtonComponent } from './filter-button/filter-button.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ScaleComponent } from './scale/scale.component';
import { NavbarComponent} from './navbar/navbar.component';
import { SpeechBarComponent } from './speech-bar/speech-bar.component';
import { HeatmapComponent } from './heatmap/heatmap.component';
import { FilterWindowComponent } from './filter-window/filter-window.component';

@NgModule({
  declarations: [
    AppComponent,
    FilterButtonComponent,
    ScaleComponent,
    NavbarComponent,
    SpeechBarComponent,
    HeatmapComponent,
    FilterWindowComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }