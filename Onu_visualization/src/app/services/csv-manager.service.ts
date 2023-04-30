import { Injectable } from '@angular/core';
import * as d3 from 'd3';

@Injectable({
  providedIn: 'root',
})
export class CsvManagerService {
  constructor() {}

  private _originalDataset: any; // CSV completo //! Talvez precise trocar o nome para deixar mais claro que eh o dataset completo com texto
  private _initFreqDataset: any; // CSV de frequencia completo

  private _filtredSpeechsDataset: any;
  private _filtredDataset: any; //  CSV Filtrado //! Talvez precise trocar o nome para deixar mais claro que eh o dataset completo com texto
  
  private _visibleSpeechDataset: any
  private _visibleDataset: any; //  Array de Numero de Ocorrencias //! N vai ser so de ocorrencia

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
  //!PROBLEMA COM NEGATIVE, POSITIVE, POSITIVE_SHARE E NEGATIVE SHARE
  private rowRemover(row: any) {

    let newPosShare = parseFloat(row.positive_share.replace(/,/g, '.'));
    let newNegShare = parseFloat(row.negative_share.replace(/,/g, '.'));
    let newPecSover = parseFloat(row.sovereignty_share.replace(/,/g, '.'));
    let newPecHuman = parseFloat(row.humanitarian_assistance_share.replace(/,/g, '.'));
    
    return {
      id: row.speech_id,
      agenda: row.agenda_info, //agenda_info - UN Official Agenda
      category: row.agenda_item1, //category
      sucategory: row.agenda_item_manual, //subcategory
      date: new Date(row.year, row.month-1,row.day), //meeting date
      country: row.country, //speech country
      speaker: row.speaker, //name of representative
      url: row.url, //speech url on ONU website
      text: row.content, //transcribed text
      posshare: newPosShare,
      negshare: newNegShare,
      qtdSovereignty: +row.sovereignty,
      percSovereignty: newPecSover,
      qtdHumanAssist: +row.humanitarian_assistance,
      percHumanAssist: newPecHuman,
    };
  } 

  private rowRemover2(row: any) {
    return {
      category: row.agenda_item1, //category
      sucategory: row.agenda_item_manual, //subcategory
      date: new Date(row.year, 0, 1), //meeting date
      qtdMeetings: +row.meetings,
      qtdSpeeches: +row.speeches,
      qtdWords: +row.words,
      qtdResolutions: +row.resolutions,
      posshare: +row.posshare,
      negshare: +row.negshare,
      qtdSovereignty: +row.sovereignty,
      percSovereignty: +row.sovereignty_perc,
      qtdHumanAssist: +row.humanitarian_assistance,
      percHumanAssist: +row.humanitarian_assistance_perc,
    };
  }

  //!TROCAR O NOME DA FUNCAO
  private reorganizeArray(selectedType:any, yearRange: Array<Date>){
    let qtdYears = +yearRange[1].getFullYear() - (+yearRange[0].getFullYear()) + 1;
    let reorganizedDatabase = [...Array(105)].map(e => {return [...Array(qtdYears)]});
    let columnName = "";
    let isPercentage = false;

    if (selectedType == "Occurrences") {
      columnName = 'wordsCount';
    } else if (selectedType == "Meetings"){
      columnName = 'qtdMeetings';
    } else if (selectedType == "Speeches"){
      columnName = 'qtdSpeeches';
    } else if (selectedType == "Words"){
      columnName = 'qtdWords';
    } else if (selectedType == "Resolutions"){
      columnName = 'qtdResolutions';
    } else if(selectedType == "Sovereignty"){
      columnName = 'qtdSovereignty';
    } else if (selectedType == "HumanAssist"){
      columnName = 'qtdHumanAssist';
    } else if (selectedType == "SovereigntyPerc"){
      columnName = 'percSovereignty';
      isPercentage = true;
    } else if (selectedType == "HumanAssistPerc"){
      columnName = 'percHumanAssist';
      isPercentage = true;
    }
    //analysing category 
    this._filtredDataset.forEach((element:any) =>{
      let yearIndex = element.date.getFullYear() - yearRange[0].getFullYear();
      let value = element[columnName];

      if (element.category == this.allCategory[0]){ //Africa
        if (reorganizedDatabase[0][yearIndex]){
          reorganizedDatabase[0][yearIndex] += value;
        } else{
          reorganizedDatabase[0][yearIndex] = value;
        }
        //loop in all Africa subcategories until find the one
        for (let index = 1; index <= 33; index++) {
          if (element.sucategory == this.allCategory[index]) {
            if (reorganizedDatabase[index][yearIndex]){
              reorganizedDatabase[index][yearIndex] += value;
            } else{
              reorganizedDatabase[index][yearIndex] = value;
            }
            index = 34; //Break Loop;
          } else if (index == 1 && element.sucategory == "Africa"){ //Special Case
            if (reorganizedDatabase[index][yearIndex]){
              reorganizedDatabase[index][yearIndex] += value;
            } else{
              reorganizedDatabase[index][yearIndex] = value;
            }
            index = 34; //Break Loop;
          }
        }
      }else if(element.category == this.allCategory[34]){//Americas
        if (reorganizedDatabase[34][yearIndex]){
          reorganizedDatabase[34][yearIndex] += value;
        } else{
          reorganizedDatabase[34][yearIndex] = value;
        }
        //loop in all Americas subcategories until find the one
        for (let index = 35; index <= 42; index++) {
          if (element.sucategory == this.allCategory[index]) {
            if (reorganizedDatabase[index][yearIndex]){
              reorganizedDatabase[index][yearIndex] += value;
            } else{
              reorganizedDatabase[index][yearIndex] = value;
            }
            index = 43; //Break Loop;
          }
        }
      }else if(element.category == this.allCategory[43]){//Asia
        if (reorganizedDatabase[43][yearIndex]){
          reorganizedDatabase[43][yearIndex] += value;
        } else{
          reorganizedDatabase[43][yearIndex] = value;
        }
        //loop in all Asia subcategories
        for (let index = 44; index <= 52; index++) {
          if (element.sucategory == this.allCategory[index]) {
            if (reorganizedDatabase[index][yearIndex]){
              reorganizedDatabase[index][yearIndex] += value;
            } else{
              reorganizedDatabase[index][yearIndex] = value;
            }
            index = 53; //Break Loop;
          }
        }
      }else if(element.category == this.allCategory[53]){//Europe
        if (reorganizedDatabase[53][yearIndex]){
          reorganizedDatabase[53][yearIndex] += value;
        } else{
          reorganizedDatabase[53][yearIndex] = value;
        }
        //loop in all Europe subcategories
        for (let index = 54; index <= 66; index++) {
          if (element.sucategory == this.allCategory[index]) {
            if (reorganizedDatabase[index][yearIndex]){
              reorganizedDatabase[index][yearIndex] += value;
            } else{
              reorganizedDatabase[index][yearIndex] = value;
            }
            index = 67; //Break Loop;
          }
        }
      }else if(element.category == this.allCategory[67]){ //Middle East
        if (reorganizedDatabase[67][yearIndex]){
          reorganizedDatabase[67][yearIndex] += value;
        } else{
          reorganizedDatabase[67][yearIndex] = value;
        }
        //loop in all Middle East subcategories
        for (let index = 68; index <= 77; index++) {
          if (element.sucategory == this.allCategory[index]) {
            if (reorganizedDatabase[index][yearIndex]){
              reorganizedDatabase[index][yearIndex] += value;
            } else{
              reorganizedDatabase[index][yearIndex] = value;
            }
            index = 78; //Break Loop;
          } else if (index == 75 && element.sucategory == "Middle East"){ //Special Case
            if (reorganizedDatabase[index][yearIndex]){
              reorganizedDatabase[index][yearIndex] += value;
            } else{
              reorganizedDatabase[index][yearIndex] = value;
            }
            index = 78; //Break Loop
          }
        }
      }else{ //Thematic
        if (reorganizedDatabase[78][yearIndex]){
          reorganizedDatabase[78][yearIndex] += value;
        } else{
          reorganizedDatabase[78][yearIndex] = value;
        }
        //loop in all Thematic subcategories
        for (let index = 79; index <= 104; index++) {
          if (element.sucategory == this.allCategory[index]) {
            if (reorganizedDatabase[index][yearIndex]){
              reorganizedDatabase[index][yearIndex] += value;
            } else{
              reorganizedDatabase[index][yearIndex] = value;
            }
            index = 105; //Break Loop;
          }
        }
      }
    });

    if (isPercentage){
      for (let index = 0; index < qtdYears; index++) {
        reorganizedDatabase[0][index] =  +(reorganizedDatabase[0][index]/33).toFixed(2);
        reorganizedDatabase[34][index] = +(reorganizedDatabase[34][index]/8).toFixed(2);
        reorganizedDatabase[43][index] = +(reorganizedDatabase[43][index]/9).toFixed(2);
        reorganizedDatabase[53][index] = +(reorganizedDatabase[53][index]/13).toFixed(2);
        reorganizedDatabase[67][index] = +(reorganizedDatabase[67][index]/10).toFixed(2);
        reorganizedDatabase[78][index] = +(reorganizedDatabase[78][index]/20).toFixed(2);        
      }
    }
    this._filtredDataset = reorganizedDatabase;
  }

  //!TROCAR O NOME DA FUNCAO
  private teste(yearRange: Array<Date>){
    let qtdYears = +yearRange[1].getFullYear() - (+yearRange[0].getFullYear()) + 1;
    let reorganizedDatabase = [...Array(105)].map(e => {return [...Array(qtdYears)]});

    //analysing category 
    this._filtredSpeechsDataset.forEach((element:any) =>{
      let yearIndex = element.date.getFullYear() - yearRange[0].getFullYear();
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
        for (let index = 68; index <= 77; index++) {
          if (element.sucategory == this.allCategory[index]) {
            if (reorganizedDatabase[index][yearIndex]){
              reorganizedDatabase[index][yearIndex].push(element);
            } else{
              reorganizedDatabase[index][yearIndex] = [element];
            }
          }
        }
      }else{ //Thematic
        if (reorganizedDatabase[78][yearIndex]){
          reorganizedDatabase[78][yearIndex].push(element);
        } else{
          reorganizedDatabase[78][yearIndex] = [element];
        }
        //loop in all Thematic subcategories
        for (let index = 79; index <= 104; index++) {
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
    this._filtredSpeechsDataset = reorganizedDatabase;
  }
  

  downloadCsv() {
    d3.dsv(";", '../assets/Database/unsc_2022_beta.csv').then(
      (data:any) => {
        this._originalDataset = data.map(this.rowRemover);
        /*
        console.log(data[0]);
        console.log(this._originalDataset[0]);
        */
      }
    );
    
    d3.csv('../assets/Database/unsc_meetings_freq.csv', this.rowRemover2).then(
      (data:any) => {
        this._initFreqDataset = data;
      }
    );
  }
  
  //Att dataset by passed Categories
  attVisibleDataset(categories: any){
    let reducedFiltredDataset = [];
    let reducedSpeechsDataset = [];
    
    for (let index = 0; index < categories.length; index++) {
      let indexArray = this.allCategory.findIndex((element) => element === categories[index]);
      reducedFiltredDataset.push(this._filtredDataset[indexArray]);
      reducedSpeechsDataset.push(this._filtredSpeechsDataset[indexArray])
    }
    this._visibleDataset = reducedFiltredDataset;
    this._visibleSpeechDataset = reducedSpeechsDataset;
  }

  //Make search based on input filters
  makeSearch(selectedType: any, categories: any, yearRange: Array<Date>, searchedWords: any){

    let initYear = yearRange[0];
    let finalYear = yearRange[1];
    let columnName = "";

    if(selectedType == "Occurrences"){
      columnName = 'wordsCount';
    }else if(selectedType == "Sovereignty"){
      columnName = 'qtdSovereignty';
    } else if (selectedType == "HumanAssist"){
      columnName = 'qtdHumanAssist';
    } else if (selectedType == "SovereigntyPerc"){
      columnName = 'percSovereignty';
    } else if (selectedType == "HumanAssistPerc"){
      columnName = 'percHumanAssist';
    }
 
    if (selectedType == "Occurrences"){
    
    //Filter By Year
    this._filtredDataset = this._originalDataset.filter((element: any) => {
      return element.date >= initYear && element.date <= finalYear;
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

      object.wordsCount = countObject['total'];
      return object;
    });

    this._filtredSpeechsDataset = [...this._filtredDataset];

    }  else{ //Speechs, Meetings
      //Filter By Year
      
      this._filtredDataset = this._initFreqDataset.filter((element: any) => {
        return element.date >= initYear && element.date <= finalYear;
      });
      console.log(this._filtredDataset);
      this._filtredSpeechsDataset = this._originalDataset.filter((element: any) => {
        return element.date >= initYear && element.date <= finalYear;
      });
    }

    if (columnName != ""){
      this._filtredSpeechsDataset = this._filtredSpeechsDataset.filter((element: any) => {
        return element[columnName] > 0;
      });
    }
    this.reorganizeArray(selectedType, yearRange);
    this.teste(yearRange);
    this.attVisibleDataset(categories);
  }

  getCellValue(indexLine: number, indexColumn: number){
    if (this._visibleDataset[indexLine][indexColumn]) {
      return this._visibleDataset[indexLine][indexColumn];  //!TIREI UM COUNT DAQUI
    }
    return undefined;
  }

  getCellSpeechs(indexLine: number, indexColumn: number){
    if (this._visibleSpeechDataset[indexLine][indexColumn]) {
      return this._visibleSpeechDataset[indexLine][indexColumn];
    }
    return [];
  }

  getMaxValue(): number{
    let maxValue = Number.MIN_SAFE_INTEGER;

    for (let indexLine = 0; indexLine < this._filtredDataset.length; indexLine++) {
      for (let indexColumn = 0; indexColumn < this._filtredDataset[indexLine].length; indexColumn++) {
        if (this._filtredDataset[indexLine][indexColumn]) {
          let actualValue = this._filtredDataset[indexLine][indexColumn]; //!TIREI UM COUNT DAQUI
          if (actualValue != undefined && actualValue > maxValue) {
            maxValue = actualValue;
          }
        }        
      }
    }
    return maxValue;
  }
}
