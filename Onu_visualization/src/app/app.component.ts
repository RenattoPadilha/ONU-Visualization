import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';
import { SelectedFiltersService } from './services/selected-filters.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  initCsv: any;
  filtredCsv: any;

  ngOnInit(): void {/*
    d3.csv('../assets/Database/unsc_2022_beta.csv', this.rowRemover).then(
      function (data) {
        let teste = data.filter((value: any, index: any, self: any) => {
          return (
            self.findIndex((i: any) => i.agendaItem === value.agendaItem) ===
            index
          );
        });

        let coisa = teste.map((i) => [i.agendaItem, i.agendaItem1]);

        coisa.sort(function (a, b) {
          return a[1].localeCompare(b[1]) || a[0].localeCompare(b[0]);
        });

        console.log(data);
        console.log(teste);
        console.log(coisa);
      }
    );*/
  }

  rowRemover(row: any) {
    return {
      agendaItem: row.agenda_item_manual,
      agendaItem1: row.agenda_item1,
    };
  }
}