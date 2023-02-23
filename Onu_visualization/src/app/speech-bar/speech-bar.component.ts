import { Component, OnInit } from '@angular/core';
import { SpeechsControlServiceService } from '../services/speechs-control-service.service';

@Component({
  selector: 'app-speech-bar',
  templateUrl: './speech-bar.component.html',
  styleUrls: ['./speech-bar.component.css']
})
export class SpeechBarComponent implements OnInit {

  data : any = [];
  teste = "speech-div";
  buttons = [
    "btn-info",
    "btn-secondary",
    "btn-info",
    "btn-secondary",
    "btn-secondary",
    "btn-secondary"
  ];
  
  constructor(private SpeechsControlServiceService: SpeechsControlServiceService) { }

  ngOnInit(): void {
    this.SpeechsControlServiceService.currentMessage.subscribe(message => (this.data = message)); //<= Always get current value!
  }
  
  handleButtonClick(buttonNumber : number){
    this.buttons = this.buttons.map(() => "btn-secondary");

    if (buttonNumber == 0 && (this.buttons [2] == "btn-info" || this.buttons [3] == "btn-info")){
      //Major button was clicked, but one of his minor buttons already on use -> do nothing
    }else if (buttonNumber == 1 && (this.buttons [4] == "btn-info" || this.buttons [3] == "btn-info")){
      //Major button was clicked, but one of his minor buttons already on use -> do nothing
    }else {
      //Search for button clicked and make search
      if (buttonNumber == 0 || buttonNumber == 2) {
        this.SpeechsControlServiceService.sortByDate(true);
        this.buttons[0] = "btn-info";
        this.buttons[2] = "btn-info";
      } else if (buttonNumber == 3) {
        this.SpeechsControlServiceService.sortByDate(false);
        this.buttons[0] = "btn-info";
        this.buttons[3] = "btn-info";
      } else if (buttonNumber == 1 || buttonNumber == 5){
        this.SpeechsControlServiceService.sortByQuantity(false);
        this.buttons[1] = "btn-info";
        this.buttons[5] = "btn-info";
      } else { //buttonNumber == 5
        this.SpeechsControlServiceService.sortByQuantity(true);
        this.buttons[1] = "btn-info";
        this.buttons[4] = "btn-info";
      }
    }

  }
}
