import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpeechsControlServiceService {

  constructor() { }

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
    let actualSpeechs = this.messageSource.value;
    let sortedSpeechs;
    let sortFunction;
      
    if (isAscendingOrder){
      sortFunction = (a: any, b: any) => a.countedWords.total - b.countedWords.total;
    } else{
      sortFunction = (a: any, b: any) => b.countedWords.total - a.countedWords.total;
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
