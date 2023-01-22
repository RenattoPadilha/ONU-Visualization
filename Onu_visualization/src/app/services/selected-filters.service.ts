import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SelectedFiltersService {

  private _selectedType: string;
  private _selectedYears : Array<number>;
  private _selectedWords : any;

  constructor() { 
    this._selectedType  = "Occurrences";
    this._selectedYears = [2012,2022];
    this._selectedWords = [];
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
  
  generateSelectedWordsArray(allWords : string){
    let wordsArray = allWords.split(" ");
    this._selectedWords = [];
    
    wordsArray.forEach(element => {
      let value = element.toLowerCase();
      this._selectedWords.push([value, 0])
    });

    this._selectedWords.push (['total', 0]);
    console.log(this._selectedWords);
  }

  inputValidation(selectedType: string, yearRange: number[], selectedWords: any) : boolean{
    if (selectedType === "Occurrences" || selectedType === "Sentiment")
      if (yearRange[0] >= 1992 || yearRange[0] <= 1992) 
        if(selectedWords.length > 0)
          return true;
    return false;
  }
}
