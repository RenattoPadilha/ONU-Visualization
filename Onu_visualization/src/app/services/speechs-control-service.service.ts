import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpeechsControlServiceService {

  constructor() { }

  private messageSource = new BehaviorSubject<any>([]);
  currentMessage = this.messageSource.asObservable();

  attSpeechs(newSpeechs : any){
    this.messageSource.next(newSpeechs);
    this.sortByDate(true);
  }

  sortByQuantity(isAscendingOrder : boolean){
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

  sortByDate(isChronologicalOrder : boolean){
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
