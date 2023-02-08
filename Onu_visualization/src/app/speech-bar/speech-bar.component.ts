import { Component, OnInit } from '@angular/core';
import { ServiceCommunicationService } from '../services/service-communication.service';

@Component({
  selector: 'app-speech-bar',
  templateUrl: './speech-bar.component.html',
  styleUrls: ['./speech-bar.component.css']
})
export class SpeechBarComponent implements OnInit {

  data : any;

  constructor(private ServiceCommunicationService: ServiceCommunicationService) { }

  ngOnInit(): void {
    this.data = this.ServiceCommunicationService.selectedSpeechs;
    this.ServiceCommunicationService.currentMessage.subscribe(message => (this.data = message)); //<= Always get current value!
  }
  
}
