import { Injectable } from '@angular/core';
import * as d3 from 'd3';

@Injectable({
  providedIn: 'root',
})
export class CsvManagerService {
  constructor() {}

  private originalCsv: any;
  private actualCsv: any;
  private lowerYear: any; //actually 1992
  private higherYear: any; //actually 2022
  
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
    'Middle East',
    'Syria',
    'Yemen',
    'Thematic', //Category 6 - index 79
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

  downloadCsv() {
    d3.csv('../assets/Database/unsc_2022_beta.csv', this.rowRemover).then(
      (data) => {
        this.originalCsv = data;
        console.log(data.length);
        /*
        let teste = data.filter((value: any, index: any, self: any) => {
          return self.findIndex((i: any) => i.year === value.year) === index;
        });
        console.log(teste);
        */
      }
    );
  }

  makeSearch(yearRange: Array<number>, actualCategories: Array<string>) {
    let initYear = yearRange[0];
    let finalYear = yearRange[1];

    //Filter By Year
    this.actualCsv = this.originalCsv.filter((element: any) => {
      return element.year >= initYear && element.year <= finalYear;
    });
    this.reorganizeArray(this.actualCsv, yearRange);
  }

  reorganizeArray(database: Array<object>, yearRange: Array<number>){
    let qtdYears = yearRange[1] - yearRange[0] + 1;
    let reorganizedDatabase = [...Array(105)].map(e => {return [...Array(qtdYears)]});

    console.log(reorganizedDatabase);
    //analysing category
    database.forEach((element:any) =>{
      let yearIndex = element.year - yearRange[0];
      if (element.category == this.allCategory[0]){ //Africa
        if (reorganizedDatabase[0][yearIndex]){
          reorganizedDatabase[0][yearIndex].push(element);
        } else{
          reorganizedDatabase[0][yearIndex] = [element];
        }
        //loop in all Africa subcategories until find the one
        for (let index = 1; index <= 33; index++) {
          if (element.sucategory == this.allCategory[index]) {
            if (reorganizedDatabase[index][yearIndex]){
              reorganizedDatabase[index][yearIndex].push(element);
            } else{
              reorganizedDatabase[index][yearIndex] = [element];
            }
          }
        }
      }else if(element.category == this.allCategory[34]){//Americas
        if (reorganizedDatabase[34][yearIndex]){
          reorganizedDatabase[34][yearIndex].push(element);
        } else{
          reorganizedDatabase[34][yearIndex] = [element];
        }
        //loop in all Americas subcategories until find the one
        for (let index = 35; index <= 42; index++) {
          if (element.sucategory == this.allCategory[index]) {
            if (reorganizedDatabase[index][yearIndex]){
              reorganizedDatabase[index][yearIndex].push(element);
            } else{
              reorganizedDatabase[index][yearIndex] = [element];
            }
          }
        }
      }else if(element.category == this.allCategory[43]){//Asia
        if (reorganizedDatabase[43][yearIndex]){
          reorganizedDatabase[43][yearIndex].push(element);
        } else{
          reorganizedDatabase[43][yearIndex] = [element];
        }
        //loop in all Asia subcategories
        for (let index = 44; index <= 52; index++) {
          if (element.sucategory == this.allCategory[index]) {
            if (reorganizedDatabase[index][yearIndex]){
              reorganizedDatabase[index][yearIndex].push(element);
            } else{
              reorganizedDatabase[index][yearIndex] = [element];
            }
          }
        }
      }else if(element.category == this.allCategory[53]){//Europe
        if (reorganizedDatabase[53][yearIndex]){
          reorganizedDatabase[53][yearIndex].push(element);
        } else{
          reorganizedDatabase[53][yearIndex] = [element];
        }
        //loop in all Europe subcategories
        for (let index = 54; index <= 66; index++) {
          if (element.sucategory == this.allCategory[index]) {
            if (reorganizedDatabase[index][yearIndex]){
              reorganizedDatabase[index][yearIndex].push(element);
            } else{
              reorganizedDatabase[index][yearIndex] = [element];
            }
          }
        }
      }else if(element.category == this.allCategory[67]){ //Middle East
        if (reorganizedDatabase[67][yearIndex]){
          reorganizedDatabase[67][yearIndex].push(element);
        } else{
          reorganizedDatabase[67][yearIndex] = [element];
        }
        //loop in all Middle East subcategories
        for (let index = 68; index <= 78; index++) {
          if (element.sucategory == this.allCategory[index]) {
            if (reorganizedDatabase[index][yearIndex]){
              reorganizedDatabase[index][yearIndex].push(element);
            } else{
              reorganizedDatabase[index][yearIndex] = [element];
            }
          }
        }
      }else{ //Thematic
        if (reorganizedDatabase[79][yearIndex]){
          reorganizedDatabase[79][yearIndex].push(element);
        } else{
          reorganizedDatabase[79][yearIndex] = [element];
        }
        //loop in all Thematic subcategories
        for (let index = 80; index <= 104; index++) {
          if (element.sucategory == this.allCategory[index]) {
            if (reorganizedDatabase[index][yearIndex]){
              reorganizedDatabase[index][yearIndex].push(element);
            } else{
              reorganizedDatabase[index][yearIndex] = [element];
            }
          }
        }
      }
    });
    console.log(reorganizedDatabase);
  }

  reorganizeArrayByCategories(database: Array<object>, yearRange: Array<number>, actualCategories: Array<string>){
    let reorganizedDatabase = [...Array()];
  }

  rowRemover(row: any) {
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
    };
  }
}