import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SelectedFiltersService {

  private _selectedType: string;
  private _selectedYears : Array<Date>;
  private _selectedWords : any;
  private messageSource = new BehaviorSubject<any>([]);
  currentMessage = this.messageSource.asObservable(); //selected type for sort dropdown (navbar component)

  constructor() { 
    this._selectedType  = "Occurrences";
    this._selectedYears = [new Date ("01/01/1992"), new Date ("12/31/2022")];
    this._selectedWords = [];
  }

  ngOnInit(): void {
  }

  get selectedType() : string {
    return this._selectedType;
  }

  get selectedYears() : Date[] {
    return this._selectedYears;
  }
  
  get selectedWords() : any {
    return this._selectedWords;
  }
  
  set selectedType(newValue : string){
    this.messageSource.next(newValue);
    this._selectedType = newValue;
  }

  set selectedYears(newValue : Date[]){
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

  inputValidation(selectedType: string, yearRange: Date[], selectedWords: any) : boolean{
    let types = ["Sentiment","Meetings","Speeches","Words","Resolutions", "Sovereignty", "HumanAssist", "SovereigntyPerc"];
    
    if (yearRange[0] >= new Date ("01/01/1992") || yearRange[1] < new Date ("01/01/2023")) {
      if (selectedType === "Occurrences" && selectedWords.length > 0)
          return true;
      if (types.findIndex((element: any) => element === selectedType) != -1)
        return true;
    }
    return false;
  }
}
