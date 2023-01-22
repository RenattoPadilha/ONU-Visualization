import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FilterButtonComponent } from './filter-button/filter-button.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NavbarComponent} from './navbar/navbar.component';
import { SpeechBarComponent } from './speech-bar/speech-bar.component';
import { HeatmapComponent } from './heatmap/heatmap.component';
import { FilterWindowComponent } from './filter-window/filter-window.component';

@NgModule({
  declarations: [
    AppComponent,
    FilterButtonComponent,
    NavbarComponent,
    SpeechBarComponent,
    HeatmapComponent,
    FilterWindowComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    FontAwesomeModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }