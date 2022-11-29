import { Component, OnInit } from '@angular/core';
import { faCircleChevronDown } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-filter-button',
  templateUrl: './filter-button.component.html',
  styleUrls: ['./filter-button.component.css'],
})
export class FilterButtonComponent implements OnInit {
  //div size
  width = '20vw';
  height = '7.5vh';
  //icon position
  icon = faCircleChevronDown;
  iconPosition = 'translateY(-50%) rotate(0deg)';
  //filter window variable
  isFilterOpen = false;

  constructor() {}

  ngOnInit(): void {}

  //Change icon position and open window
  buttonClick() {
    if (this.isFilterOpen) {
      //Close Filter Window
      this.isFilterOpen = false;
      this.iconPosition = 'translateY(-50%) rotate(0deg)';
    } else {
      //Open Filter Window
      this.isFilterOpen = true;
      this.iconPosition = 'translateY(-50%) rotate(-180deg)';
    }
    console.log(this.iconPosition);
  }
}
