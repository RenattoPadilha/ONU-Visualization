import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SelectedFiltersService {

  private allCategory = [
    'Africa',
    'Americas',
    'Asia',
    'Europe',
    'Middle East',
    'Thematic',
  ];
  
  private allSubCattegories = [
    //Africa
    [
      'Africa',
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

  private actualCategories = this.allCategory;
  private actualYearRange = [2000, 2010];

  constructor() { }

  getCategories(){
    return this.actualCategories;
  }

  getYearRange(){
    return this.actualYearRange;
  }
}
