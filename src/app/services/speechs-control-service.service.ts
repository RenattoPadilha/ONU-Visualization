import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { SelectedFiltersService } from './selected-filters.service';

@Injectable({
  providedIn: 'root'
})
export class SpeechsControlServiceService {

  constructor(private SelectedFiltersService: SelectedFiltersService) { }

  private messageSource = new BehaviorSubject<any>([]);
  currentMessage = this.messageSource.asObservable();

  private messageSort = new BehaviorSubject<any>([]);
  currentSort = this.messageSort.asObservable();

  attSpeechs(newSpeechs : any){
    this.messageSource.next(newSpeechs);
    this.sortChooser();
  }

  attSort(newFilter : any){
    this.messageSort.next(newFilter);
    this.sortChooser();
  }

  private sortChooser(){
    if (this.messageSort.value == '0') {
      this.sortByDate(true);
    } else if (this.messageSort.value == '1') {
      this.sortByDate(false);
    } else if (this.messageSort.value == '2'){
      this.sortByQuantity(true);
    } else { //currentSort == '3'
      this.sortByQuantity(false);
    }
  }

  private sortByQuantity(isAscendingOrder : boolean){
    let selectedType = this.SelectedFiltersService.selectedType;
    let columnName = "";
    let actualSpeechs = this.messageSource.value;
    let sortedSpeechs;
    let sortFunction;
    
    if (selectedType == "Occurrences") {
      columnName = 'wordsCount';
    } else if (selectedType == "Sovereignty"){
      columnName = 'qtdSovereignty';
    } else if (selectedType == "HumanAssist"){
      columnName = 'qtdHumanAssist';
    } else if (selectedType == "SentimentPos"){
      columnName = 'qtdPosWords';
    } else if (selectedType == "SentimentNeg"){
      columnName = 'qtdNegWords';
    }
      
    if (isAscendingOrder){
      sortFunction = (a: any, b: any) => a[columnName] - b[columnName];
    } else{
      sortFunction = (a: any, b: any) => b[columnName] - a[columnName];
    }

    sortedSpeechs = actualSpeechs.sort(sortFunction);
    this.messageSource.next(sortedSpeechs);
  }

  private sortByDate(isChronologicalOrder : boolean){
    let actualSpeechs = this.messageSource.value;
    let sortedSpeechs;
    let sortFunction;
      
    if (isChronologicalOrder){
      sortFunction = (a: any, b: any) => a.date - b.date;
    } else{
      sortFunction = (a: any, b: any) => b.date - a.date;
    }

    sortedSpeechs = actualSpeechs.sort(sortFunction);
    this.messageSource.next(sortedSpeechs);
  }
}
