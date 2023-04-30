import { Component, OnInit } from '@angular/core';
import { SpeechsControlServiceService } from '../services/speechs-control-service.service';
import { SelectedFiltersService } from '../services/selected-filters.service';

@Component({
  selector: 'app-speech-bar',
  templateUrl: './speech-bar.component.html',
  styleUrls: ['./speech-bar.component.css'],
})
export class SpeechBarComponent implements OnInit {
  data: any = [];
  textPt1: any;
  textPt2: any;
  columnName: any;

  constructor(
    private SpeechsControlServiceService: SpeechsControlServiceService,
    private SelectedFiltersService: SelectedFiltersService
  ) {}

  ngOnInit(): void {
    this.SpeechsControlServiceService.currentMessage.subscribe((message) => {
      this.data = message; //<= Always get current value! 

      let selectedType = this.SelectedFiltersService.selectedType;
      if (selectedType == 'Occurrences') {
        this.textPt1 = "Searched words: ";
        this.columnName = 'wordsCount';
        this.textPt2 = " occurrences";
      } else if(selectedType == 'Sovereignty'){
        this.textPt1 = "Citations: ";
        this.columnName = 'qtdSovereignty';
        this.textPt2 = " times";
      } else if(selectedType == 'HumanAssist'){
        this.textPt1 = "Quantity: ";
        this.columnName = 'qtdHumanAssist';
        this.textPt2 = " times";
      }else if(selectedType == 'SovereigntyPerc'){
        this.textPt1 = "Citations: ";
        this.columnName = 'percSovereignty';
        this.textPt2 = "%";
      }else if(selectedType == 'HumanAssistPerc'){
        this.textPt1 = "Citations: ";
        this.columnName = 'percHumanAssist';
        this.textPt2 = "%";
      }else { //meetings, speechs, words, resolutions
        this.textPt1 = "";
        this.columnName = '';
        this.textPt2 = "";
      }
    });
  }
}
