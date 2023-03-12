import { Component, OnInit } from '@angular/core';
import { SpeechsControlServiceService } from '../services/speechs-control-service.service';

@Component({
  selector: 'app-speech-bar',
  templateUrl: './speech-bar.component.html',
  styleUrls: ['./speech-bar.component.css']
})
export class SpeechBarComponent implements OnInit {

  data : any = [];
  
  constructor(private SpeechsControlServiceService: SpeechsControlServiceService) { }

  ngOnInit(): void {
    this.SpeechsControlServiceService.currentMessage.subscribe(message => {
      this.data = message; //<= Always get current value!
    }); 
  }
}
