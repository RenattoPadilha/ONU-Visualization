import { Component, OnInit, Input } from '@angular/core';
import { CsvManagerService } from '../services/csv-manager.service';
import { ServiceCommunicationService } from '../services/service-communication.service';

@Component({
  selector: 'app-filter-window',
  templateUrl: './filter-window.component.html',
  styleUrls: ['./filter-window.component.css'],
})
export class FilterWindowComponent implements OnInit {
  constructor(
    private CsvManagerService: CsvManagerService,
    private ServiceCommunicationService: ServiceCommunicationService
  ) {
    this._selectedType = 'Occurrences';
    this._lowerYear = new Date ("01/01/1992");
    this._higherYear = new Date ("12/31/2022");
    this._selectedWords = "";
    this.isFilterWindowOpen = false;
  }

  ngOnInit(): void {
    this.CsvManagerService.downloadCsv();
  }

  @Input() isFilterWindowOpen: boolean;
  _lowerYear: Date;
  _higherYear: Date;
  _selectedType: string;
  _selectedWords: string;

  submit() {
    console.log(this._lowerYear);
    console.log(this._higherYear);
    let isValid = this.ServiceCommunicationService.attFilters(
      this._selectedType,
      [this._lowerYear, this._higherYear],
      this._selectedWords
    );
    if (isValid) {
      this._lowerYear = new Date ("01/01/1992");
      this._higherYear = new Date ("12/31/2022");
      this._selectedWords = "";
      
      this.ServiceCommunicationService.handleSearch();
    } else{
      //Error message
    }
  }
}
