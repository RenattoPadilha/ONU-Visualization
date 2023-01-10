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
    this._lowerYear = 2012;
    this._higherYear = 2022;
    this._selectedWords = ['Ukraine', 'Donetsk'];
    this.isFilterWindowOpen = false;
  }

  ngOnInit(): void {
    this.CsvManagerService.downloadCsv();
  }

  @Input() isFilterWindowOpen: boolean;
  private _selectedType: string;
  private _lowerYear: number;
  private _higherYear: number;
  private _selectedWords: any;

  get selectedType(): string {
    return this._selectedType;
  }

  inputValidation(): boolean {
    return true;
  }

  submit() {
    if (this.inputValidation()) {
      this.ServiceCommunicationService.attFilters(
        this._selectedType,
        [this._lowerYear, this._higherYear],
        this._selectedWords
      );
      this.ServiceCommunicationService.handleSearch();
    }
  }
}
