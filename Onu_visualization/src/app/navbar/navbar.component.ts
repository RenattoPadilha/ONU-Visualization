import { Component, OnInit } from '@angular/core';
import * as d3 from "d3";
import { SpeechsControlServiceService } from '../services/speechs-control-service.service';
import { SelectedFiltersService } from '../services/selected-filters.service';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private SpeechsControlServiceService: SpeechsControlServiceService, private SelectedFiltersService: SelectedFiltersService) { }

  panelOpenState = true;
  selectedSort = '0';
  quantitySortOn = true;

  ngOnInit(): void {
    this.SelectedFiltersService.currentMessage.subscribe((selectedType) => {
      let types = ["Occurrences", "Sovereignty"];
      if (types.findIndex((element: any) => element === selectedType) != -1) {
        this.quantitySortOn = true;
      } else {
        this.quantitySortOn = false;
      }
    });
  }  
  
  isFilterWindowOpen = false; 
 
  attWindowState (actualState: boolean){
    this.isFilterWindowOpen = actualState;
  }

  handleButtonClick(){
    this.SpeechsControlServiceService.attSort(this.selectedSort);
  }
}
