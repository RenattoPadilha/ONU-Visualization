import { Component, OnInit } from '@angular/core';
import { SpeechsControlServiceService } from '../services/speechs-control-service.service';

@Component({
  selector: 'app-speech-bar',
  templateUrl: './speech-bar.component.html',
  styleUrls: ['./speech-bar.component.css']
})
export class SpeechBarComponent implements OnInit {

  panelOpenState = true;
  data : any = [];
  selectedSort = "0";
  
  constructor(private SpeechsControlServiceService: SpeechsControlServiceService) { }

  ngOnInit(): void {
    this.SpeechsControlServiceService.currentMessage.subscribe(message => {
      this.data = message; //<= Always get current value!
      this.handleButtonClick();
    }); 
  }
  
  handleButtonClick(){
    if (this.selectedSort == '0') {
      this.SpeechsControlServiceService.sortByDate(true);
    } else if (this.selectedSort == '1') {
      this.SpeechsControlServiceService.sortByDate(false);
    } else if (this.selectedSort == '2'){
      this.SpeechsControlServiceService.sortByQuantity(true);
    } else { //selectedSort == '3'
      this.SpeechsControlServiceService.sortByQuantity(false);
    }
  }

}
