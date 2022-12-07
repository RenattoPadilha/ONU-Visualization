import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CategoriesControlService {  
  private _allCategory = [
    'Africa',
    'Americas',
    'Asia',
    'Europe',
    'Middle East',
    'Thematic',
  ];
  
  private _allSubCattegories = [
    //Africa
    [
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
    ],
  
    //Americas
    [
      'Central America',
      'Colombia',
      'Cuba',
      'El Salvador',
      'Guatemala',
      'Haiti',
      'Honduras',
      'Venezuela',
    ],
  
    //Asia
    [
      'Afghanistan',
      'Cambodia',
      "Democratic People's Republic Of Korea",
      'Myanmar',
      'Nepal',
      'Papua New Guinea',
      'Solomon Islands',
      'Tajikistan',
      'Timor-Leste',
    ],
  
    //Europe
    [
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
    ],
  
    //Middle East
    [
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
    ],
  
    //Thematic
    [
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
    ],
  ];

  private _categories : Array<string>;

  constructor() { 
    this._categories = this._allCategory.slice();
  }

  get categories() : string[] {
    return this._categories;
  }

  //Handle category click
  handleClick(titleClicked: string){
    if (this.isCategory(titleClicked)) {
      this.removeCategory(titleClicked);
    } else{
      this.removeSubCategories(titleClicked);
    }
  }

  //Determines if a string is a category or subcategory title
  private isCategory (categoryName : string) : boolean{
    return this._allCategory.includes(categoryName);
  }

  //Remove category of visualization and add its subcategories
  private removeCategory(categoryName : string){
    let absoluteCategoryIndex = this._allCategory.findIndex((element) => categoryName == element);
    let categoryActualIndex = this._categories.findIndex((element) => categoryName == element);
    let subCategories = this._allSubCattegories[absoluteCategoryIndex];

    this._categories.splice(categoryActualIndex, 1, ...subCategories);
    //draw image dnv
  }

  //Remove subcategories "siblings" of visualization and add its categorie
  private removeSubCategories(subCategoryName : string){
    //descobrir do que é subcategoria
    let category = "";
    let firstSubcattegorie = "";
    let qtdSubcattegories = 0;

    for (let macroIndex = 0; macroIndex < this._allSubCattegories.length; macroIndex++) {
      for (let microIndex = 0; microIndex < this._allSubCattegories[macroIndex].length; microIndex++) {
        if (subCategoryName == this._allSubCattegories[macroIndex][microIndex]){
          category = this._allCategory[macroIndex];
          firstSubcattegorie = this._allSubCattegories[macroIndex][0];
          qtdSubcattegories = this._allSubCattegories[macroIndex].length;
        }
      }
    }
    let firstSubcattegorieActualIndex = this._categories.findIndex((element) => firstSubcattegorie == element);

    //remover todas as subcategorias //add categoria macro novamente
    this._categories.splice(firstSubcattegorieActualIndex, qtdSubcattegories, category);

    console.log(this._categories);
  }
}
