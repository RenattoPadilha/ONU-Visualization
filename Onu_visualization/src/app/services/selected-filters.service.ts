import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SelectedFiltersService {

  private _selectedType: string;
  private _selectedYears : Array<number>;
  private _selectedWords : any;

  constructor() { 
    this._selectedType = "Occurrences";
    this._selectedYears = [2000,2022];
    this._selectedWords = ["Ukraine", "Donetsk"];
  }

  ngOnInit(): void {
  }

  get selectedType() : string {
    return this._selectedType;
  }

  get selectedYears() : number[] {
    return this._selectedYears;
  }
  
  get selectedWords() : any {
    return this._selectedWords;
  }
  
  set selectedType(newValue : string){
    this._selectedType = newValue;
  }

  set selectedYears(newValue : number[]){
    this._selectedYears = newValue;
  }
  
  set selectedWords(newValue : any){
    this._selectedWords = newValue;;
  }
}
