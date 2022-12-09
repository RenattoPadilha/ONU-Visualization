import { Component, OnInit, Input } from '@angular/core';
import { SelectedFiltersService } from '../services/selected-filters.service';
import { DrawHeatmapService } from '../services/draw-heatmap.service';
import { CsvManagerService } from '../services/csv-manager.service';
import { CategoriesControlService } from '../services/categories-control.service';

@Component({
  selector: 'app-filter-window',
  templateUrl: './filter-window.component.html',
  styleUrls: ['./filter-window.component.css'],
})
export class FilterWindowComponent implements OnInit {
  constructor(
    private SelectedFiltersService: SelectedFiltersService,
    private DrawHeatmapService: DrawHeatmapService,
    private CsvManagerService: CsvManagerService,
    private CategoriesControlService: CategoriesControlService
  ) {
    this._selectedType = 'Occurrences';
    this._lowerYear = 1990;
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
      console.log(
        this._selectedType,
        this._lowerYear,
        this._higherYear,
        this._selectedWords
      );
      this.SelectedFiltersService.selectedType = this._selectedType;
      this.SelectedFiltersService.selectedYears = [
        this._lowerYear,
        this._higherYear,
      ];
      let actualCategories = this.CategoriesControlService.categories;
      this.SelectedFiltersService.selectedWords = this._selectedWords;
      this.DrawHeatmapService.isDrawedBefore = true;
      this.DrawHeatmapService.drawCanvas();
      this.CsvManagerService.makeSearch([this._lowerYear, this._higherYear], actualCategories);
    }
  }
}
