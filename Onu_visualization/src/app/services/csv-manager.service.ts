import { Injectable } from '@angular/core';
import * as d3 from 'd3';

@Injectable({
  providedIn: 'root',
})
export class CsvManagerService {
  constructor() {}

  private _originalDataset: any; // CSV completo
  private _filtredDataset: any; //  CSV Filtrado
  private _visibleDataset: any; //  Array de Numero de Ocorrencias
  private lowerYear: any; //actually 1992
  private higherYear: any; //actually 2022
  
  get visibleDataset() : any {
    return this._visibleDataset;
  }

  private allCategory = [
    'Africa', //Category 1 - index 0
    ' Africa ',
    'African Union',
    'Angola',
    'Burundi',
    'Central African Region',
    'Central African Republic',
    'Central African Republic/Chad',
    'Chad/Libya',
    'Chad/Sudan',
    "Côte D'ivoire",
    'Democratic Republic Of The Congo',
    'Djibouti/Eritrea',
    'Djibouti/Horn Of Africa',
    'Ethiopia/Eritrea',
    'Great Lakes',
    'Guinea',
    'Guinea-Bissau',
    'Liberia',
    'Libya',
    'Mali',
    'Mauritania',
    'Mozambique',
    'Republic Of The Congo',
    'Rwanda',
    'Sierra Leone',
    'Somalia',
    'South Africa',
    'Sudan',
    'Sudan/South Sudan',
    'Uganda',
    'West Africa',
    'Western Sahara',
    'Zimbabwe',
    'Americas', //Category 2 - index 34
    'Central America',
    'Colombia',
    'Cuba',
    'El Salvador',
    'Guatemala',
    'Haiti',
    'Honduras',
    'Venezuela',
    'Asia', //Category 3 - index 43
    'Afghanistan',
    'Cambodia',
    "Democratic People's Republic Of Korea",
    'Myanmar',
    'Nepal',
    'Papua New Guinea',
    'Solomon Islands',
    'Tajikistan',
    'Timor-Leste',
    'Europe', //Category 4 - index 53
    'Albania',
    'Bosnia And Herzegovina',
    'Croatia',
    'Cyprus',
    'Former Yugoslav Republic Of Macedonia',
    'Former Yugoslavia',
    'Georgia',
    'Kosovo',
    'Nagorny Karabakh',
    'Osce',
    'Russian Federation/Ukraine',
    'Ukraine',
    'United Kingdom',
    'Middle East', //Category 5 - index 67
    'Iran',
    'Iraq',
    'Iraq/Kuwait',
    'Israel/Lebanon',
    'Israel/Palestine',
    'Israel/Syria',
    'Lebanon',
    ' Middle East ',
    'Syria',
    'Yemen',
    'Thematic', //Category 6 - index 78
    'An Agenda For Peace',
    'Children And Armed Conflict',
    'Climate Change',
    'Conflict Diamonds',
    'Conflict Prevention',
    'Food And Security',
    'Hiv/Aids',
    'Humanitarian Assistance',
    'International Tribunals',
    'Maintenance Of International Peace And Security',
    'Non-Proliferation',
    'Others',
    'Pacific Islands',
    'Pacific Settlement Of Disputes',
    'Peacebuilding',
    'Peacekeeping',
    'Procedure Rules',
    'Protection Of Civilians',
    'Regional Organizations',
    'Rule Of Law',
    'Sanctions',
    'Security Council Mission',
    'Small Arms',
    'Terrorism',
    'Threats To International Peace And Security',
    'Women And Peace And Security',
  ];

  private rowRemover(row: any) {
    return {
      agenda: row.agenda_info, //agenda_info - UN Official Agenda
      category: row.agenda_item1, //category
      sucategory: row.agenda_item_manual, //subcategory
      date: row.date, //meeting date
      year: +row.year, //meeting year
      country: row.country, //speech country
      speaker: row.speaker, //name of representative
      url: row.url, //speech url on ONU website
      text: row.content, //transcribed text
      countedWords : [],
    };
  } 
  
  private reorganizeArray(yearRange: Array<number>){
    let qtdYears = yearRange[1] - yearRange[0] + 1;
    let reorganizedDatabase = [...Array(105)].map(e => {return [...Array(qtdYears)]});
    
    //analysing category
    this._filtredDataset.forEach((element:any) =>{
      let yearIndex = element.year - yearRange[0];
      if (element.category == this.allCategory[0]){ //Africa
        if (reorganizedDatabase[0][yearIndex]){
          reorganizedDatabase[0][yearIndex].push(element);
          reorganizedDatabase[0][yearIndex].count += element.countedWords.total;
        } else{
          reorganizedDatabase[0][yearIndex] = [element];
          reorganizedDatabase[0][yearIndex].count = element.countedWords.total;
        }
        //loop in all Africa subcategories until find the one
        for (let index = 1; index <= 33; index++) {
          if (element.sucategory == this.allCategory[index]) {
            if (reorganizedDatabase[index][yearIndex]){
              reorganizedDatabase[index][yearIndex].push(element);
              reorganizedDatabase[index][yearIndex].count += element.countedWords.total;
            } else{
              reorganizedDatabase[index][yearIndex] = [element];
              reorganizedDatabase[index][yearIndex].count = element.countedWords.total;
            }
          }
        }
      }else if(element.category == this.allCategory[34]){//Americas
        if (reorganizedDatabase[34][yearIndex]){
          reorganizedDatabase[34][yearIndex].push(element);
          reorganizedDatabase[34][yearIndex].count += element.countedWords.total;
        } else{
          reorganizedDatabase[34][yearIndex] = [element];
          reorganizedDatabase[34][yearIndex].count = element.countedWords.total;
        }
        //loop in all Americas subcategories until find the one
        for (let index = 35; index <= 42; index++) {
          if (element.sucategory == this.allCategory[index]) {
            if (reorganizedDatabase[index][yearIndex]){
              reorganizedDatabase[index][yearIndex].push(element);
              reorganizedDatabase[index][yearIndex].count += element.countedWords.total;
            } else{
              reorganizedDatabase[index][yearIndex] = [element];
              reorganizedDatabase[index][yearIndex].count = element.countedWords.total;
            }
          }
        }
      }else if(element.category == this.allCategory[43]){//Asia
        if (reorganizedDatabase[43][yearIndex]){
          reorganizedDatabase[43][yearIndex].push(element);
          reorganizedDatabase[43][yearIndex].count += element.countedWords.total;
        } else{
          reorganizedDatabase[43][yearIndex] = [element];
          reorganizedDatabase[43][yearIndex].count = element.countedWords.total;
        }
        //loop in all Asia subcategories
        for (let index = 44; index <= 52; index++) {
          if (element.sucategory == this.allCategory[index]) {
            if (reorganizedDatabase[index][yearIndex]){
              reorganizedDatabase[index][yearIndex].push(element);
              reorganizedDatabase[index][yearIndex].count += element.countedWords.total;
            } else{
              reorganizedDatabase[index][yearIndex] = [element];
              reorganizedDatabase[index][yearIndex].count = element.countedWords.total;
            }
          }
        }
      }else if(element.category == this.allCategory[53]){//Europe
        if (reorganizedDatabase[53][yearIndex]){
          reorganizedDatabase[53][yearIndex].push(element);
          reorganizedDatabase[53][yearIndex].count += element.countedWords.total;
        } else{
          reorganizedDatabase[53][yearIndex] = [element];
          reorganizedDatabase[53][yearIndex].count = element.countedWords.total;
        }
        //loop in all Europe subcategories
        for (let index = 54; index <= 66; index++) {
          if (element.sucategory == this.allCategory[index]) {
            if (reorganizedDatabase[index][yearIndex]){
              reorganizedDatabase[index][yearIndex].push(element);
              reorganizedDatabase[index][yearIndex].count += element.countedWords.total;
            } else{
              reorganizedDatabase[index][yearIndex] = [element];
              reorganizedDatabase[index][yearIndex].count = element.countedWords.total;
            }
          }
        }
      }else if(element.category == this.allCategory[67]){ //Middle East
        if (reorganizedDatabase[67][yearIndex]){
          reorganizedDatabase[67][yearIndex].push(element);
          reorganizedDatabase[67][yearIndex].count += element.countedWords.total;
        } else{
          reorganizedDatabase[67][yearIndex] = [element];
          reorganizedDatabase[67][yearIndex].count = element.countedWords.total;
        }
        //loop in all Middle East subcategories
        for (let index = 68; index <= 77; index++) {
          if (element.sucategory == this.allCategory[index]) {
            if (reorganizedDatabase[index][yearIndex]){
              reorganizedDatabase[index][yearIndex].push(element);
              reorganizedDatabase[index][yearIndex].count += element.countedWords.total;
            } else{
              reorganizedDatabase[index][yearIndex] = [element];
              reorganizedDatabase[index][yearIndex].count = element.countedWords.total;
            }
          }
        }
      }else{ //Thematic
        if (reorganizedDatabase[78][yearIndex]){
          reorganizedDatabase[78][yearIndex].push(element);
          reorganizedDatabase[78][yearIndex].count += element.countedWords.total;
        } else{
          reorganizedDatabase[78][yearIndex] = [element];
          reorganizedDatabase[78][yearIndex].count = element.countedWords.total;
        }
        //loop in all Thematic subcategories
        for (let index = 79; index <= 104; index++) {
          if (element.sucategory == this.allCategory[index]) {
            if (reorganizedDatabase[index][yearIndex]){
              reorganizedDatabase[index][yearIndex].push(element);
              reorganizedDatabase[index][yearIndex].count += element.countedWords.total;
            } else{
              reorganizedDatabase[index][yearIndex] = [element];
              reorganizedDatabase[index][yearIndex].count = element.countedWords.total;
            }
          }
        }
      }
    });
    this._filtredDataset = reorganizedDatabase;
  }

  downloadCsv() {
    d3.csv('../assets/Database/unsc_2022_beta.csv', this.rowRemover).then(
      (data:any) => {
        this._originalDataset = data;
        /*
        let teste = data.filter((value: any, index: any, self: any) => {
          return value.qtd > 0.2;
        });
        console.log(teste);
        */
      }
    );
  }
  
  //Att dataset by passed Categories
  attVisibleDataset(categories: any){
    let reducedArray = [];
    
    for (let index = 0; index < categories.length; index++) {
      let indexArray = this.allCategory.findIndex((element) => element === categories[index]);
      reducedArray.push(this._filtredDataset[indexArray]);
    }
    this._visibleDataset = reducedArray;
  }

  //Make search based on input filters
  makeSearch(categories: any, yearRange: Array<number>, searchedWords: any){

    //Filter By Year
    let initYear = yearRange[0];
    let finalYear = yearRange[1];

    this._filtredDataset = this._originalDataset.filter((element: any) => {
      return element.year >= initYear && element.year <= finalYear;
    });

    //Counting searched words
    this._filtredDataset.map((object: any, index: any, array: any) => {
      let text = object.text.split(" ");
      
      let countObject = Object.fromEntries(searchedWords);      

      text.reduce ((accumulator: any, currentValue: any) => {
        for (let index = 0; index < searchedWords.length-1; index++) {
          let prop = searchedWords[index][0]
          if (prop === currentValue.toLowerCase()) {
            accumulator[prop] += 1;
            accumulator.total += 1;
            return accumulator;
          }
        }
        return accumulator;
      }, countObject);

      object.countedWords = countObject;
      return object;
    });

    this._filtredDataset = this._filtredDataset.filter((element: any) => {
      return element.countedWords.total > 0;
    });
    this.reorganizeArray(yearRange);
    this.attVisibleDataset(categories);
  }

  getCellValue(indexLine: number, indexColumn: number){
    if (this._visibleDataset[indexLine][indexColumn]) {
      return this._visibleDataset[indexLine][indexColumn].count;
    }
    return undefined;
  }

  getMaxValue(): number{
    let maxValue = Number.MIN_SAFE_INTEGER;
    for (let indexLine = 0; indexLine < this._filtredDataset.length; indexLine++) {
      for (let indexColumn = 0; indexColumn < this._filtredDataset[indexLine].length; indexColumn++) {
        if (this._filtredDataset[indexLine][indexColumn]) {
          let actualValue = this._filtredDataset[indexLine][indexColumn].count;
          if (actualValue != undefined && actualValue > maxValue) {
            maxValue = actualValue;
          }
        }        
      }
    }
    return maxValue;
  }
}
