import { Component, OnInit } from '@angular/core';
import * as d3 from "d3";
import { SpeechsControlServiceService } from '../services/speechs-control-service.service';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private SpeechsControlServiceService: SpeechsControlServiceService) { }

  panelOpenState = true;
  selectedSort = '0';

  ngOnInit(): void {
  }  
  
  isFilterWindowOpen = false; 
 
  attWindowState (actualState: boolean){
    this.isFilterWindowOpen = actualState;
  }

  handleButtonClick(){
    this.SpeechsControlServiceService.attSort(this.selectedSort);
  }
}
